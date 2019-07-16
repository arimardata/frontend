const fillTable = table => {
  let headerElements = getTableHeader(table);
  return (
    <table className="table mb-0">
      <thead className="bg-light">
        <tr>
          {headerElements.map(element => {
            return (
              <th scope="col" className="border-0">
                {element}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {table.map(element => {
          return (
            <tr key={element.id}>
              {/* <Button
                outline
                size="sm"
                theme="dark"
                className="mb-2 mr-1"
                onClick={() =>
                  Dispatcher.dispatch({
                    actionType: Constants.UPDATE_USER,
                    payload: element
                  })
                }
              >
                <i class="material-icons">create</i>
              </Button> */}
              {headerElements.map(headerElement => {
                try {
                  return (
                    <th scope="col" className="border-0">
                      {element[headerElement].toString()}
                    </th>
                  );
                } catch (error) {}
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const getTableHeader = table => {
  // all table elements has the same archetechture, we return the first element's archetechture :
  try {
    return Object.keys(table[0]);
  } catch (Error) {
    return [];
  }
};
