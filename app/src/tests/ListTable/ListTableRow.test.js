import React from 'react';
import { shallowWrap, mountWrap } from './../../setupTests';

import { ListTableRow } from './../../Components/ListTable/ListTableRow';

describe('ListTableRow unit test', () => {
  let wrapper;
  const buttons = [{ 'name': 'button name', 'function': 'edit', 'parameter': '/test-route' }];
  const rowData = { 'id': 1, 'name': 'mock name', 'trueField': true, 'falseField': false };
  const rowColumns = ['id', 'name', 'trueField', 'falseField'];

  beforeEach(() => {
    wrapper = shallowWrap(<ListTableRow buttons={buttons} rowData={rowData} rowColumns={rowColumns}/>);
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
    expect(wrapper.children()).toHaveLength(2);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('ListTableRow functional test', () => {
  it('renders table row correctly, including boolean field (True/False icons', () => {
    const buttons = [{ 'name': 'button name', 'function': 'edit', 'parameter': '/test-route' }];
    const rowData = { 'id': 1, 'name': 'mock name', 'trueField': true, 'falseField': false };
    const rowColumns = ['id', 'name', 'trueField', 'falseField'];
    const wrapper = mountWrap(<table><tbody><ListTableRow rowData={rowData} rowColumns={rowColumns} buttons={buttons}/></tbody></table>);
    expect(wrapper.find('ListTableRowButtons').exists()).toBe(true);
    expect(wrapper.find('EditIcon').exists()).toBe(true);
    expect(wrapper.find('tr')).toHaveLength(1);
    expect(wrapper.find('td')).toHaveLength(5);
    expect(wrapper.find('td').at(0).
      text()).toEqual('1');
    expect(wrapper.find('td').at(1).
      text()).toEqual('mock name');
    expect(wrapper.find('DoneIcon').exists()).toBe(true);
    expect(wrapper.find('ClearIcon').exists()).toEqual(true);
  });
  it('renders empty table row correctly', () => {
    const buttons = [];
    const rowData = {};
    const rowColumns = [];
    const wrapper = mountWrap(<table><tbody><ListTableRow rowData={rowData} rowColumns={rowColumns} buttons={buttons}/></tbody></table>);
    expect(wrapper.text()).toEqual('');
  });
});
