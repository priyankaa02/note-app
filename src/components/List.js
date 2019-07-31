import React, { Component } from 'react';
import NoteCard from './NoteCard';

class List extends Component {

  componentWillMount() {
    console.log("fvfvfv",this.props.categoryName)
    if (this.props.categoryName !== "All Notes") {
      setTimeout(function() {
        const formData = {
          notesIds: this.props.category.notes
        };
        this.props.getMoreNotes(formData)
      }.bind(this), 1000)
    }
    else {
      this.props.getNotes();
    }
  }

  render() {
    const { notes, getNote, deleteNote } = this.props;
    const cards = notes.map((note, index) => {
      return (
        <NoteCard
          key={index}
          index={index}
          note={note}
          getNote={getNote}
          deleteNote={deleteNote}
        />
      );
    });

    return (
      <div className="list-container">
        {cards}
      </div>
    );
  }
}

export default List;
