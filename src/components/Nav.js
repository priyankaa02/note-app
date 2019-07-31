import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Nav extends Component {

  state = {
    text: 'All Notes',
    id: ''
  };

  componentWillMount() {
    this.setState({text: 'All Notes'})
    this.props.getCategories();
  }

  onSubmit(e) {
    e.preventDefault();
    const formData = {
      name: this.name.value,
      notes: []
    };
    this.props.submitCategory(formData,null);
    document.getElementById("myForm").style.display = "none"
    setTimeout(function() {
      if (this.props.error === '') {
        toast.success("Successfully added category!", {
              position: toast.POSITION.TOP_CENTER
        });
        this.props.getCategories();
      }
    }.bind(this), 1500)
  }

  onMove(e,name,id) {
    e.preventDefault();
    const formData = {
      name: name,
      noteId: this.props.note._id
    };
    this.props.submitCategory(formData,id);
    // document.getElementById("category").style.display = "none"
    setTimeout(function() {
      if (this.props.error === '') {
        toast.success("Successfully added into category!", {
              position: toast.POSITION.TOP_CENTER
        });
        this.props.getCategories();
      }
    }.bind(this), 1500)
  }

  onChange(e,name,id) {
    e.preventDefault();
    this.setState({text: name,id: id})
    this.props.getCategory(id)
    setTimeout(function() {
      const formData = {
        notesIds: this.props.category.notes
      };
      this.props.getMoreNotes(formData)
    }.bind(this), 1500)
  }

  onAllChange(e) {
    this.setState({text: "All Notes"})
    this.props.getNotes();
  }

  render() {
    const { toggleNote, showNote, handleChange, categories, deleteCategory } = this.props;
    let category
    if (showNote) {
      category = categories.map((category, index) => {
        return (
           <a className="move-a" href="#" onClick={(e) => this.onMove(e,category.name,category._id)}>{category.name}</a>
        );
      });
    } else {
      category = categories.map((category, index) => {
        return (
          <span><a href="#" onClick={(e) => this.onChange(e,category.name,category._id)}>{category.name}<span style={{fontSize: "20px",color: "grey",marginLeft: '20px'}}>{category.notes.length}</span></a><i className="material-icons" style={{height: 6,color: "grey"}} onClick={() => deleteCategory(category._id)}>delete</i></span>
        );
      });
    }

    return (
      <div className="nav-container">
       { showNote ?
         <div>
         { category.length > 0 && <div className="dropdown">
           <button className="dropbtn">Move To
             <i className="material-icons">arrow_drop_down</i>
           </button>
           <div className="dropdown-content">
             <div id="category">{category}</div>
           </div>
         </div> }
         </div>
         :
        <div className="dropdown">
          <button className="dropbtn">{this.state.text}
            <i className="material-icons">arrow_drop_down</i>
          </button>
          <div className="dropdown-content">
            { this.state.text !== 'All Notes' && <div onClick={(e) => this.onAllChange(e)}><a>All Notes</a></div>}
            <div>{category}</div>
            <a href="#" onClick={() => { document.getElementById("myForm").style.display = "block" }}>{'+ Add Category'}</a>
            <div className="form-popup" id="myForm">
              <form onSubmit={(e) => this.onSubmit(e)} className="form-container">
                <input type="text" placeholder="Enter category" name="email" ref={(input) => this.name = input} required/>
                <button type="submit" class="btn">Add</button>
                <button type="button" className="btn cancel" onClick={() => { document.getElementById("myForm").style.display = "none" }}>Close</button>
              </form>
            </div>
          </div>
        </div> }
        { !showNote && <input type="text" name="search" placeholder="Search.." className="search-bar" onChange={(e) => handleChange(e,this.state.text,this.state.id)}/> }
        <div className="nav-button" onClick={() => toggleNote()} >
          { showNote ? 'Cancel' :  '+ Note' }
        </div>
        <ToastContainer autoClose={1200}/>
      </div>
    );
  }
}

export default Nav;
