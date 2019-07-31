import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import List from './components/List';
import Note from './components/Note';
import axios from 'axios';
import urlFor from './helpers/urlFor';
import Flash from './components/Flash';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showNote: false,
      notes: [],
      note: {},
      category: {},
      newTag: false,
      error: '',
      type: '',
      searchString: '',
      categories: []
    };
  }

  toggleNote = () => {
    this.setState({
      showNote: ! this.state.showNote,
      type: 'edit',
      note: {}
    })
  }

  handleChange = (e,text,id) => {
    this.setState({
      searchString: e.target.value
    }, () => {
      if (this.state.searchString && this.state.searchString.length > 0) {
          const filterData = this.state.searchString ? this.state.notes.filter(row => row.title.indexOf(this.state.searchString) > -1) : this.state.notes;
          this.setState({ notes: filterData })
      }
      else {
        if ( text === 'All Notes'){
             this.getNotes()
         }
         else {
           if (id) {
             this.getCategory(id)
             const formData = {
               notesIds: this.state.category.notes
             };
             this.getMoreNotes(formData)
           }
         }
      }
    })
  }

  getNotes = () => {
    axios.get(urlFor('notes'))
    .then((res) => this.setState({notes: res.data}) )
    .catch((err) => console.log(err.response.data) );
  }

  getCategories = () => {
    axios.get(urlFor('categories'))
    .then((res) => this.setState({categories: res.data}) )
    .catch((err) => console.log(err.response.data) );
  }

  getNote = (id,type) => {
    axios.get(urlFor(`notes/${id}`))
    .then((res) => this.setState({note: res.data, showNote: true, type: type }) )
    .catch((err) => console.log(err.response.data) );
  }

  getMoreNotes = (notesIds) => {
    axios.post(urlFor('notes/more'), notesIds)
    .then((res) => this.setState({notes: res.data}) )
    .catch((err) => console.log(err.response.data) );
  }

  getCategory = (id) => {
    axios.get(urlFor(`categories/${id}`))
    .then((res) => this.setState({category: res.data}) )
    .catch((err) => console.log(err.response.data) );
  }

  performSubmissionRequest = (data,id) => {
    if (id) {
      return axios.put(urlFor(`notes/${id}`), data);
    } else {
      return axios.post(urlFor('notes'), data);
    }
  }

  submitNote = (data,id) => {
    console.log(data,id)
    this.performSubmissionRequest(data,id)
    .then((res) => this.setState({ showNote: false }) )
    .catch((err) => {
      const { errors } = err.response.data;
      if (errors) {
        this.setState({ error: errors });
      }
    });
  }

  performCategorySubmissionRequest = (data,id) => {
    if (id) {
      this.getCategory(id)
      return axios.put(urlFor(`categories/${id}`), data);
    } else {
      return axios.post(urlFor('categories'), data);
    }
  }

  submitCategory = (data,id) => {
    this.performCategorySubmissionRequest(data,id)
    .then((res) => {
      if (this.state.category && this.state.category.notes) {
        if (res.data.notes.length === this.state.category.notes.length) {
        this.setState({ error: "note already exists in this category" });
       }
     }
    })
    .catch((err) => {
      const { message } = err.response.data;
      if (message) {
        this.setState({ error: message });
      }
    });
  }

  deleteNote = (id) => {
    const newNotesState = this.state.notes.filter((note) => note._id !== id );
    axios.delete(urlFor(`notes/${id}`) )
    .then((res) => this.setState({ notes: newNotesState }) )
    .catch((err) => console.log(err.response.data) );
  }

  deleteCategory = (id) => {
    const newCategoryState = this.state.categories.filter((category) => category._id !== id );
    axios.delete(urlFor(`categories/${id}`) )
    .then((res) => this.setState({ categories: newCategoryState }) )
    .catch((err) => console.log(err.response.data) );
  }

  showTagForm = () => {
    this.setState({ newTag: true });
  }

  closeTagForm = () => {
    this.setState({ newTag: false });
  }

  submitTag = (data, noteId) => {
    axios.post(urlFor(`notes/${noteId}/tags`), data)
    .then((res) => this.getNote(noteId) )
    .catch((err) => {
      const { errors } = err.response.data;
      if (errors.name) {
        this.setState({ error: "Missing Tag Name!" })
      } else if (errors.title) {

      }
    });
  }

  deleteTag = (noteId, id) => {
    axios.delete(urlFor(`/tags/${id}`))
    .then((res) => this.getNote(noteId) )
    .catch((err) => console.log(err.response.body))
  }

  resetError = () => {
    this.setState({ error: '' });
  }

  render() {
    const { showNote, notes, categories, note, category, type, newTag, error } = this.state;

    return (
      <div className="App">
        <Nav toggleNote={this.toggleNote} getNotes={this.getNotes} getMoreNotes={this.getMoreNotes} getCategory={this.getCategory} category={category} error={error} note={note} showNote={showNote} submitCategory={this.submitCategory} deleteCategory={this.deleteCategory} notes={notes} categories={categories} getCategories={this.getCategories} handleChange={this.handleChange}/>
        {error && <Flash error={error} resetError={this.resetError} />}
        <br />
        { showNote ?
            <Note
              note={note}
              newTag={newTag}
              type={type}
              submitNote={this.submitNote}
              showTagForm={this.showTagForm}
              closeTagForm={this.closeTagForm}
              submitTag={this.submitTag}
              deleteTag={this.deleteTag}
            />
            :
            <List
              getNotes={this.getNotes}
              notes={notes}
              getNote={this.getNote}
              deleteNote={this.deleteNote}
            /> }
      </div>
    );
  }
}

export default App;
