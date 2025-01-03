
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFormAnalytics } from '../api/analyticsService';
import styles from './AnalyticsPage.module.css';
import { close } from '../data/useImportAssets';

const AnalyticsPage = () => {
  const { shareableLink } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getFormAnalytics(shareableLink);
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, [shareableLink]);

  if (!analytics) {
    return <div>Loading...</div>;
  }

  // Format date as "Jul 17, 3:23 PM"
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  // Collect all unique field labels from the submissions
  const fieldLabels = new Set();
  analytics.submissions.forEach(submission => {
    submission.userResponses.forEach(response => {
      fieldLabels.add(response.label);
    });
  });

  const headers = ["Sr no.", "Submitted At", ...fieldLabels];

  return (
    <div className={styles.analyticsContainer}>
      <header className={styles.header}>
        <div className={styles.button_container}>
          <button className={`${styles.button} ${styles.active}`}>Flow</button>
          <button className={styles.button}>Theme</button>
          <button className={styles.button}>Response</button>
        </div>
        <div className={styles.button}>
          <button className={styles.share}>Share</button>
          <button className={styles.save}>Save</button>
          <img src={close} alt="close image" onClick={() => navigate('/workspace')} />
        </div>
      </header>
      <div className={styles.analyticsOverview}>
        <div className={styles.analyticsCard}>
          <p>Views</p>
          <p>{analytics.totalViews}</p>
        </div>
        <div className={styles.analyticsCard}>
          <p>Starts</p>
          <p>{analytics.totalStarts}</p>
        </div>
        <div className={styles.analyticsCard}>
          <p>Completion Rate</p>
          <p>{analytics.completionRate.toFixed(2)}%</p>
        </div>
      </div>
      <table className={styles.submissionsTable}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {analytics.submissions.map((submission, submissionIndex) => (
            <tr key={submission._id}>
              <td>{submissionIndex + 1}</td>
              <td>{formatDate(submission.createdAt)}</td>
              {Array.from(fieldLabels).map((label, index) => {
                const response = submission.userResponses.find(r => r.label === label);
                return <td key={index}>{response ? response.response : ''}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsPage;









