import React, { Component } from 'react';
import DatePicker from 'react-datepicker'

export default class StudentItem extends Component {
  constructor(props)
  {
    super(props);
    this.state ={
      isEdit:false,
      dueDate:this.props.student.dueDate
    }
    this.editStudent = this.editStudent.bind(this);
    this.editStudentSubmit = this.editStudentSubmit.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.markCompleted=this.markCompleted.bind(this);
  }
  deleteStudent()
  {
    const {id} = this.props.student;
    this.props.deleteStudent(id);
  }
  editStudent()
  {
    this.setState((prevState,props) => ({
      isEdit : !prevState.isEdit
    }))
  }
  editStudentSubmit()
  {
    const {id} = this.props.student;
    this.setState((prevState,props) => ({
      isEdit : !prevState.isEdit
    }));
    this.props.editStudentSubmit(id,this.nameInput.value,this.descInput.value,new Date(this.state.dueDate).toLocaleDateString(),this.priInput.value);
  }

  handleDateChange = date => {
    this.setState({
      dueDate: date
    });
  };

  markCompleted()
  {
    const {id} = this.props.student;
    this.props.markCompleted(id);
  }

    render() {
        const {title,description,dueDate,priority,status} = this.props.student;
        const actionsString= status === 'Open' ? <i className="fas fa-check" onClick={this.markCompleted} title="Mark as Done"></i> : <i className="fas fa-redo" onClick={this.markCompleted} title="Re Open"></i>
      return (
        this.state.isEdit === true ? 

        <tr className="bg-warning" key={this.props.index}>
          <td><input className="form-control" ref={nameInput => this.nameInput = nameInput} defaultValue ={title}/></td>
          <td><textarea rows="1" className="form-control" ref={descInput => this.descInput = descInput} defaultValue={description}/></td>
          <td>
            <DatePicker onChange={this.handleDateChange} selected={new Date(this.state.dueDate)} className="form-control"/>
          </td>
          <td>
            <select className="form-control" ref={priInput => this.priInput = priInput} defaultValue={priority} >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                  </select>
          </td>
          <td>{status}</td>
          <td>
            <i className="far fa-save" onClick={this.editStudentSubmit} title="Save"></i>
          </td>
        </tr>
 :
        <tr key={this.props.index}>
          <td>{title}</td>
          <td>{description}</td>
          <td>{dueDate}</td>
          <td>{priority}</td>
          <td>{status}</td>
          <td>
            <i className="far fa-edit" onClick={this.editStudent} title="Edit"></i>
            <i className="fas fa-trash" onClick={this.deleteStudent} title="Delete"></i>
            {actionsString}
          </td>
        </tr>
      );
    }
  }
