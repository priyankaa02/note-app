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
    const formData = {
      title: this.title.value,
      content: this.state.content
      // content: this.content.value
    };
    this.props.submitNote(formData, this.props.note._id);
  }

  createMarkup() {
    return {__html: marked(this.props.note.content)};
  }

  onTagSubmit(e) {
    e.preventDefault();
    const formData = {
      name: this.name.value
    }
    this.props.submitTag(formData, this.props.note.id)
    this.props.closeTagForm();
  }

  renderTagForm(note) {
    if ( note.id !== undefined) {
      if(!this.props.newTag) {
        return (
          <span>
            Tag your note:
            <i
              className="tag-button material-icons"
              onClick={() => this.props.showTagForm()}
            >
              add circle
            </i>
          </span>
        );
      } else {
        return (
          <form onSubmit={(e) => this.onTagSubmit(e)}>
            <input
              className="tag-input"
              type="text"
              placeholder="Tag Name..."
              ref={(input) => this.name = input}
            />
          </form>
        );
      }
    }
  }

  renderTags (note) {
    if (note.tags) {
      return note.tags.map((tag, index) =>
        <div
          className="tag"
          key={index}
          onClick={(e) => this.props.deleteTag(note.id, tag.id)}
        >
          <span className="delete">
            <i className="material-icons">delete</i>
          </span>
          {tag.name}
        </div>
      );
    }
  }

  render() {
    const { note, type, closeTagForm } = this.props;
    return(
      <div className="note-container">
        { type && type === "edit" ? <h2>Edit This Note</h2> : <h2>View Note</h2> }
        <form
          className="note-form"
          onSubmit={(e) => this.onSubmit(e)}
          onClick={() => closeTagForm()}
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
            {/*<textarea
              className="note-textarea"
              placeholder="Type Here..."
              defaultValue={note.content}
              ref={(input) => this.content = input}
            />*/}
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
          { type && type === "edit" && <input className="note-button" type="submit" value="Submit" /> }
        </form>
        <div className="tag-container">
          <div className="tag-button-container">
            {this.renderTagForm(note)}
          </div>
          <div className="tag-list-container">
            {this.renderTags(note)}
          </div>
        </div>
      </div>
    );
  }
}

export default Note;
