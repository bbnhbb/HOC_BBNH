import ReactDOM from "react-dom";
import React from "react";
import "./styles.css";

export default function App(props) {
  return (
    <div className="App">
      <h1>Data</h1>
      <div>
        <pre>{JSON.stringify(props.data, null, 2)}</pre>
      </div>
    </div>
  );
}

function withApi(Component, url) {
  return class extends React.Component {
    state = {
      data: []
    };

    componentDidMount() {
      fetch(url)
        .then((_data) => _data.json())
        .then((_data) => {
          this.setState({ data: _data });
        });
    }

    render() {
      return <Component {...this.props} data={this.state.data} />;
    }
  };
}

const AppWithApiPosts = withApi(
  App,
  "https://my-json-server.typicode.com/typicode/demo/posts"
);

const AppWithApiComments = withApi(
  App,
  "https://my-json-server.typicode.com/typicode/demo/comments"
);

const RootApp = () => (
  <>
    <AppWithApiPosts />
    <AppWithApiComments />
  </>
);
const rootElement = document.getElementById("root");
ReactDOM.render(<RootApp />, rootElement);
