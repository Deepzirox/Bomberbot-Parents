import React from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

import { Button } from 'react-bootstrap';


/*Import bootstrap */
import ReactDOM from "react-dom";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

import ModalProgress from './ModalProgress';
import GeneralInfo from './GeneralInfo';

import './styles/ProgressChildren.css';
import './styles/ModalProgress.css';


export default function ProgressChildren(props){

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let count = 0;
    let classes = '', classScroll = '';

    let location = useLocation();
    let id_student;


    //Save id_studend reload the page
    if(location.state){
        localStorage.setItem('id_student', location.state.id_student);
        id_student = location.state.id_student;
    } else{
        id_student = localStorage.getItem('id_student')
    }

    
    
    /* console.log(location.state.id_student); */

    const [ state, setState ] = React.useState([]);
    const [ index, setIndex ] = React.useState(0);
    const [ general, setGeneral ] = React.useState([]);

/*     React.useEffect(async() => { */
        
    
    React.useEffect(()=>{

        const required = {
                "id_student": [
                    {
                        "id": id_student
                    }
                ]
        };
        axios.post('http://127.0.0.1:8000/progress/', required)
        .then(response =>{
            console.log(response);
            if(response.data.Status === 'OK'){
                axios('http://127.0.0.1:8000/progress/')
                .then(res => (
                    console.log(res.data),
                    console.log(res.data.projects),
                    setState(res.data.projects),
                    setGeneral(res.data.general)
                ))
            }
        })

        .catch(error =>(console.error(error)));

    }, [])
    

    if(state.length === 1){
        classes = "col-12 col-sm-6 col-md-6 col-lg-6 align-items-center"
        classScroll = "container-fluid justify-content-center style-main";
    } else if(state.length === 2){
        classes = "col-12 col-sm-6 col-md-4 col-lg-4 align-items-center"
        classScroll = "container-fluid justify-content-center style-main";
    } else {
        classes = "col-12 col-sm-6 col-md-4 col-lg-4 align-items-center"
        classScroll = "container-fluid justify-content-center scroll-page style-main";
    }

    const PrintModal= (e, i) =>{
            setIndex(i);
            handleShow();
            console.log("EL estado que queremos ver para todos es necesarios", state[i])
    }

    // SPLIT FOR GOALS
    let arrayGoals = []
    if (state[index]) {
        const cadenaGoals = state[index].goals_projet
        const cadenaDivGoals = cadenaGoals.split('.')    
        for (let i = 0; i < cadenaDivGoals.length - 1; i++) {
            arrayGoals.push(cadenaDivGoals[i] + '.')
        }
    }
    
    // SPLIT FOR SKILL
    let arraySkills = []
    if (state[index]) {
        const cadenaSkills = state[index].skill_project
        const cadenaDivSkills = cadenaSkills.split('.')    
        for (let i = 0; i < cadenaDivSkills.length - 1; i++) {
            arraySkills.push(cadenaDivSkills[i] + '.')
        } 
    }



    return (
        <div className={classScroll}>
            <div className="row card-intern align-items-center justify-content-end">
                
                <GeneralInfo general={general} clas={classes}/> 
                {state ? state.map((project, i) =>{
                    count = count + 1
                return( 
                <div className={classes} key={i}>
                    <div className="container2 justify-content-center">
                        <div className="card2">
                            <div className="face face1">
                                <div className="content">
                                    <img src={project.url_image} />
                                    <h3>Project: {count}</h3>
                                    <h4>{project.name_project}</h4>
                                </div>
                            </div>
                            <div className="face face2">
                                <div className="content">
                                    {/* <p> {project.proj_description.substring(0, 176)}</p> */}
                                    <p>
                                        <strong>Total task:</strong> {project.total_task_proj}<br />
                                        <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Finished task:</strong> {project.finished_tasks}<br />
                                        <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pending task:</strong> {project.pending_task}<br />
                                        <strong>Expiration date:</strong> {project.task_due}<br />
                                        <strong>Days expired:</strong> {project.days_exp_task}<br />
                                    </p>
                                    <Button variant="primary" onClick={e => PrintModal(e, i)}>
                                        Read More
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 )
                }): ''}
            </div>
            <Modal 
                show={show}
                onHide={handleClose}
                keyboard={false}

                size="lg" 
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                    <Modal.Header>
                        <Modal.Title>
                            <strong className="tit-modal">Important information:</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                            <strong className="des-modal">Project description:</strong> 
                                <p className="des-modal-content">{state[index] ? state[index].proj_description : ''}</p><br />
                                
                            <strong className="des-modal">Project goals:</strong>
                                <p className="des-modal-content">
                                        {arrayGoals.map(arrGoal => <li>{arrGoal}</li>)}
                                        
                                </p><br />
                           
                            <strong className="des-modal">Project skill:</strong> 
                                <p className="des-modal-content">
                                        {arraySkills.map(arrSkills => <li>{arrSkills}</li>)}
                                </p><br />
                    </Modal.Body>
                    
                    
                    <Modal.Footer>
                        <Button onClick={handleClose}>Close</Button>
                    </Modal.Footer>
            </Modal>
                
        </div>

    )
}
