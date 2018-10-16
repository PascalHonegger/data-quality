import React from 'react';
import { Query, Mutation } from 'react-apollo';


export const BaseForm = ({ title, FormComponent, ComponentRepository, afterSaveRoute, history, initialFieldValues }) => <Query query={ComponentRepository.getFormDropdownData()}>
  {({ formDropdownLoading, formDropdownError, data }) => {
    if (typeof ComponentRepository.insert !== 'function' || typeof ComponentRepository.getFormDropdownData !== 'function') {
      throw new TypeError('Repository must implement insert and getFormDropdownData functions.');
    }
    const mutation = initialFieldValues === null ? ComponentRepository.insert() : ComponentRepository.update();
    if (formDropdownLoading) {
      return <p>Loading...</p>;
    }
    if (formDropdownError) {
      return <p>Error :(</p>;
    }
    return (
      <Mutation mutation={mutation} onCompleted={() => {
        history.push(afterSaveRoute);
      }}>
        {(mutate, { mutationLoading, mutationError }) => <React.Fragment>
          <div style={{ 'marginLeft': '60px' }}>{title}</div>
          <FormComponent
            data={data}
            mutate={mutate}
            initialFieldValues={initialFieldValues}
          />
          {mutationLoading && <p>Loading...</p>}
          {mutationError && <p>Error :( Please try again</p>}

        </React.Fragment>
        }
      </Mutation>
    );
  }}

</Query>;


