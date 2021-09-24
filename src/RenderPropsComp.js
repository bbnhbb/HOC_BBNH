import React from "react";

class WithApi extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    fetch(this.props.url)
      .then((_data) => _data.json())
      .then((_data) => {
        this.setState({ data: _data });
      });
  }

  render() {
    return this.props.children(this.state.data);
  }
}

class RenderPropsComp extends React.Component {
  render() {
    return (
      <div>
        <WithApi url="https://my-json-server.typicode.com/typicode/demo/posts">
          {(data) => {
            return (
              <>
                <h2>Posts</h2>
                <div>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
              </>
            );
          }}
        </WithApi>

        <WithApi url="https://my-json-server.typicode.com/typicode/demo/comments">
          {(data) => {
            return (
              <>
                <h2>Comments</h2>
                <div>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
              </>
            );
          }}
        </WithApi>
      </div>
    );
  }
}

export default RenderPropsComp;
