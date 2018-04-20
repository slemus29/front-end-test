import React, { Component } from 'react';
import logo from './logo.svg';
import Table from './table'
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {fileContent:""};
      this.extractContent = this.extractContent.bind(this);
  }


  extractContent(event) {
    event.preventDefault();
    const input = this.file;
    if(input){
      const file = input.files[0];
      if(file) {
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8")
        reader.onload = event =>{
          this.setState({fileContent:event.target.result})
        }
        reader.onerror = event =>{
          this.setState({fileContent:""});
        }
      } else {
        this.setState({fileContent:""});
      }
    } else{
      this.setState({fileContent:""});
    }
  }

  render() {
    return (
      <div className="App">
        <form className="formUbigeos" onSubmit={this.extractContent}>
          <input className="formUbigeos__input" type="file" ref={input => this.file = input}/>
          <button className="formUbigeos__btn">Import</button>
        </form>
        <Table content={this.state.fileContent}/>
      </div>
    );
  }
}

export default App;
