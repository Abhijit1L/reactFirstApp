import React, { Component } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import StudentList from './StudentList';


const studentList = [ //MM/DD/YYY
  {id:1,title:'Fill Timesheet',description:'Fill time sheet EOD',dueDate:'5/15/2020',priority:'High',status:'Open'},
  {id:2,title:'Book ticket',description:'Book ticket to Kolhapur',dueDate:'5/19/2020',priority:'Low',status:'Completed'},
  {id:3,title:'Mail to HR',description:'Send mail ti Hr regarding docs',dueDate:'5/18/2020',priority:'High',status:'Open'},
  {id:4,title:'Pay Bill',description:'Pau electricity bill',dueDate:'5/20/2020',priority:'Medium',status:'Open'},
  {id:5,title:'Call Abhi',description:'Call abhi for code updates',dueDate:'5/22/2020',priority:'Low',status:'Open'}
];

if (localStorage.getItem("students") === null)
  localStorage.setItem('students', JSON.stringify(studentList));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      description:'',
      dueDate:new Date(),
      studentList: []
    }
    this.editStudentSubmit = this.editStudentSubmit.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.addNewStudent = this.addNewStudent.bind(this);
    this.markCompleted = this.markCompleted.bind(this);
  }
  componentWillMount() {
    let studentList = JSON.parse(localStorage.getItem("students"));

    this.setState((prevState, props) => (
      {
        studentList: studentList
      }
    )
    );
  }
  addNewStudent(event) {
       event.preventDefault();

      let title = this.refs.title.value;
      let description = this.refs.description.value;
      let priority = this.refs.priority.value;

       this.refs.myForm.reset();
      this.setState((prevState, props) => ({

      studentList: [...prevState.studentList, { id:Math.max(...prevState.studentList.map(function(o){return o.id})) + 1,title:title,description:description,dueDate: this.state.dueDate.toLocaleDateString(),priority:priority,status:'Open' }]

    }));

    localStorage.setItem('students', JSON.stringify(studentList));
  }

  deleteStudent(id) {
    let r = window.confirm("Do you want to delete this item");
    if (r === true) {
      let filteredStudentList = this.state.studentList.filter(x => x.id !== id);

      this.setState((prevState, props) => ({
        studentList: filteredStudentList
      }));
      localStorage.setItem('students', JSON.stringify(filteredStudentList));
    }
  }

  markCompleted(id){
    let r = window.confirm("Sure to change status ?");
    if (r === true) {
      let studentListCopy = this.state.studentList.map((student) => {
        if (student.id === id) {
          student.status === "Open" ?student.status = "Completed" : student.status = "Open";
          
        }
        return student;
      });
      this.setState((prevState, props) => ({
        studentList: studentListCopy
      }));
      localStorage.setItem('students', JSON.stringify(studentListCopy));
    }
  }

  editStudentSubmit(id,title, description, dueDate,priority) {
    let studentListCopy = this.state.studentList.map((student) => {
      if (student.id === id) {
        student.title = title;
        student.description = description;
        student.dueDate = dueDate;
        student.priority = priority;
      }
      return student;
    });
    this.setState((prevState, props) => ({
      studentList: studentListCopy
    }));
    localStorage.setItem('students', JSON.stringify(studentListCopy));
  }

    handleDateChange = date => {
      this.setState({
        dueDate: date
      });
    };

  render() {
    return (
      <>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <b>TO DO APP</b>
            </div>
            <div className="card-body">

            <form ref="myForm" className="myForm">
              <label><strong>Title</strong></label><br/>
                <input type="text" ref="title" placeholder="Title" maxLength="140" minLength="10" className="form-Field form-control"/>

              <div className="input-field">
                <label><strong>Description</strong></label><br/>
                <textarea ref="description" placeholder="description" className="textArea form-control" maxLength="500" minLength="10"/>
              </div>
              <br/>

              <div className="row col-lg-12">
                <div className="col-lg-6"> 
                <label><strong>Due Date</strong></label>&nbsp;
                  <DatePicker onChange={this.handleDateChange} selected={this.state.dueDate} className="form-control"/>
                </div>
                <div className="row col-lg-6">
                  <div className="col-lg-2 no-padding"><label className="margin"><strong>Priority </strong></label> &nbsp;&nbsp;</div>
                  <div className="col-lg-4 no-padding">
                  <select className="form-control" ref="priority" >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                  </select>
                    </div> 
                </div>
              </div>
      
              <div>
                  <button onClick={(event)=>this.addNewStudent(event)} className="btn btn-dark pull-left">Add</button>
              </div>
          </form>

          <hr></hr>

              <table className="table table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                  </thead>
                <StudentList deleteStudent={this.deleteStudent} studentList={this.state.studentList} editStudentSubmit={this.editStudentSubmit} markCompleted={this.markCompleted} reopen={this.markCompleted}/>
              </table>
            </div>
            </div>
          </div>
        </div>
        </div>

        </>
    );
  }
}

export default App;
