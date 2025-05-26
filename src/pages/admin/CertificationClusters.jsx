const CertificationClusters = ({ clusters, loading }) => {
  if (loading) return <p>Loading...</p>;

  // Handle case where clusters might be null or undefined
  if (!clusters) return <p>No certification data available</p>;

  return (
    <div>
      <h2>Certification Clusters</h2>
      {Object.entries(clusters).map(([certName, alumniList]) => (
        <div key={certName} style={{ marginBottom: '2rem' }}>
          <h3>{certName}</h3>
          <table border="1" cellPadding="10" width="100%">
            <thead>
              <tr>
                <th>Alumni</th>
                <th>Job Titles</th>
                <th>Is Related To Job?</th>
                <th>Is Employed?</th>
              </tr>
            </thead>
            <tbody>
              {/* Add check for alumniList existence and ensure it's an array */}
              {Array.isArray(alumniList) && alumniList.map((item, index) => (
                <tr key={`${certName}-${index}`}>
                  <td>{item.alumni_name || 'N/A'}</td>
                  <td>
                    {item.job_titles && item.job_titles.length > 0 ? (
                      <ul>
                        {item.job_titles.map((job, i) => (
                          <li key={i}>{job}</li>
                        ))}
                      </ul>
                    ) : (
                      <em>No job titles</em>
                    )}
                  </td>
                  <td>{item.is_related_to_job ? '✅ Yes' : '❌ No'}</td>
                  <td>{item.is_employed ? '✅ Yes' : '❌ No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default CertificationClusters;