import React, { Component } from 'react';
import marked from 'marked';

class NoteCard extends Component {

  createMarkup() {
    return {__html: marked(this.props.note.content)};
  }

  render() {
    const { note, getNote, deleteNote } = this.props;
    return(
      <div className="note-card-container">
        <div className="note-card-title">
          {note.title}
        </div>
        <div className="note-card-content" onClick={() => getNote(note._id,"view")} dangerouslySetInnerHTML={this.createMarkup()} />
        <span className="note-card-delete" onClick={() => deleteNote(note._id)}>
          <i className="material-icons del-icon">delete</i>
        </span>
        <span className="note-card-edit" onClick={() => getNote(note._id,"edit")}>
          <i className="material-icons">mode_edit</i>
        </span>
      </div>
    );
  }
}

export default NoteCard;
