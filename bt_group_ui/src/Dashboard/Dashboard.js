import React,{useState, useEffect} from 'react';
import './Dashboard.scss';
import FeebackItem from './FeebackItem';

const Dashboard = () => {
    const [feedbackList, setfeedbackList] = useState(null);

    useEffect(() => {
        const feedPostHandler = async() => {
            try{
                const URL = "https://bt-group-backend.onrender.com/";
                const response = await fetch(URL);
                const resultJSON = await response.json();
                if(resultJSON.status){
                    setfeedbackList(resultJSON.data);
                }
            }
            catch(err){
                console.log("Error occured during API Call");
            }   
        }
        feedPostHandler();
    },[]);
  return (
    <div className='dashboard-container'>
        <h2 className='dashboard-title'>Feedback Dashboard</h2>
        {feedbackList && feedbackList.length > 0 ?
            <div className='table-component'>
                <table>
                    <thead>
                        <tr>
                            <th className='th-sno'>S.no</th>
                            <th className='th-name'>Name</th>
                            <th className='th-email'>Email</th>
                            <th className='th-company'>Company</th>
                            <th className='th-comments'>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbackList?.map((feedback,index) => (
                            <FeebackItem key={feedback._id} feedback={feedback} index={index} />
                        ))}
                    </tbody>
                </table>
            </div>
            : 
            <>
                <p>No data found in the feedback dashboard page</p>
            </>
        }
    </div>
  )
}

export default Dashboard