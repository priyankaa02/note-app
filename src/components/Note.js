import React, { Component } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import marked from 'marked';

class Note extends Component {
  state = {
    content: ''
  };

  onSubmit(e) {
    e.preventDefault();
    let formData
    if ( this.props.category && this.props.category._id) {
      formData = {
        title: this.title.value,
        content: this.state.content,
        category: [this.props.category._id]
      };
    }
    else {
      formData = {
        title: this.title.value,
        content: this.state.content
        // content: this.content.value
      };
    }
    this.props.submitNote(formData, this.props.note._id);
    if ( this.props.category && this.props.category._id ){
        setTimeout(function() {
          const formData = {
            name: this.props.category.name,
            noteId: this.props.note._id
          };
          this.props.submitCategory(formData,this.props.category._id);
        }.bind(this), 3000)
   }
  }

  createMarkup() {
    return {__html: marked(this.props.note.content)};
  }


  render() {
    const { note, type } = this.props;
    return(
      <div className="note-container">
        { type && type === "edit" ? <h2>Edit This Note</h2> : <h2>View Note</h2> }
        <form
          className="note-form"
          onSubmit={(e) => this.onSubmit(e)}
        >
          <div className="note-title">
          { type && type === "edit" ?
            <input
              className="note-title-input"
              type="text"
              placeholder="Note Title..."
              defaultValue={note.title}
              ref={(input) => this.title = input}
            />
            :
            <p className="note-title-input">{note.title}</p> }
          </div>
          <div className="note-textarea-container">
            { type && type === "edit" ?
            <SimpleMDE
               id="your-custom-id"
               onChange={value => this.setState({ content: value })}
               value={note.content}
               options={{
                    autofocus: true,
                    spellChecker: false,
                    hideIcons: ["guide"]
                 }}
            />
            :
            <div
              className="note-textarea"
              dangerouslySetInnerHTML={this.createMarkup()}/> }
          </div>
          { type && type === "edit" && <input className="note-button" type="submit" value="Save" /> }
        </form>
      </div>
    );
  }
}

export default Note;
