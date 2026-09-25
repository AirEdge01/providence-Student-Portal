import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import * as db from '../utils/localDB';

export default function PostResults() {
  const [text, setText] = useState('');
  const [session, setSession] = useState('2025/2026');
  const [semester, setSemester] = useState('First');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [createMissing, setCreateMissing] = useState(true);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setReport(null);

    let entries;
    try {
      entries = JSON.parse(text);
      if (!Array.isArray(entries)) {
        throw new Error('Payload must be a valid JSON array of result records.');
      }
    } catch (err) {
      setIsError(true);
      setMessage('Invalid JSON syntax: ' + err.message);
      return;
    }

    // Attach target session & semester if missing from individual payload items
    const formattedEntries = entries.map((item) => ({
      ...item,
      session: item.session || session,
      semester: item.semester || semester,
    }));

    setLoading(true);

    try {
      const res = db.publishResults(formattedEntries, {
        createMissingFromRegistry: createMissing,
      });

      setReport(res);
      setIsError(false);
      setMessage(
        `Successfully disbursed results for ${res.updated || 0} student(s) to their portals.` +
          (res.created ? ` Created ${res.created} new registry student accounts.` : '')
      );
      setText('');
    } catch (err) {
      setIsError(true);
      setMessage('Disburser Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '20px 0' }}>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h3 className="fw-bold mb-1" style={{ color: '#0F2C59' }}>
              Disburse Semester Results
            </h3>
            <p className="text-muted mb-0">
              Batch publish academic records to student portals for viewing and A4 statement downloads.
            </p>
          </div>
          <span className="badge bg-primary px-3 py-2">Registry Admin Portal</span>
        </div>

        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Academic Session</label>
                  <select
                    className="form-select"
                    value={session}
                    onChange={(e) => setSession(e.target.value)}
                  >
                    <option value="2025/2026">2025/2026</option>
                    <option value="2024/2025">2024/2025</option>
                    <option value="2023/2024">2023/2024</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Semester</label>
                  <select
                    className="form-select"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  >
                    <option value="First">First Semester</option>
                    <option value="Second">Second Semester</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Batch Result Payload (JSON Format)
                </label>
                <textarea
                  className="form-control font-monospace"
                  style={{ fontSize: 13 }}
                  rows={12}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={`[\n  {\n    "matricNumber": "PICE/2026/0001",\n    "courseCode": "GST 101",\n    "courseTitle": "Use of English I",\n    "creditUnit": 2,\n    "score": 75\n  }\n]`}
                />
              </div>

              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={createMissing}
                  id="createMissing"
                  onChange={(e) => setCreateMissing(e.target.checked)}
                />
                <label className="form-check-label text-secondary" htmlFor="createMissing">
                  Auto-register new student profiles if matric number is not in active registry
                </label>
              </div>

              <button
                className="btn btn-primary px-4 py-2 fw-semibold"
                type="submit"
                disabled={loading || !text.trim()}
                style={{ backgroundColor: '#0F2C59', borderColor: '#0F2C59' }}
              >
                {loading ? 'Disbursing to Portals...' : 'Release & Disburse Results'}
              </button>

              {message && (
                <div
                  className={`alert ${isError ? 'alert-danger' : 'alert-success'} mt-3 mb-0`}
                >
                  {message}
                </div>
              )}

              {report?.errors?.length > 0 && (
                <div className="alert alert-warning mt-3 mb-0">
                  <strong>The following entries could not be processed:</strong>
                  <ul className="mb-0 mt-2 ps-3">
                    {report.errors.slice(0, 10).map((er, i) => (
                      <li key={i}>
                        <small>
                          <strong>{er.reason}</strong> — {JSON.stringify(er.entry)}
                        </small>
                      </li>
                    ))}
                    {report.errors.length > 10 && (
                      <li>...and {report.errors.length - 10} more items</li>
                    )}
                  </ul>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}