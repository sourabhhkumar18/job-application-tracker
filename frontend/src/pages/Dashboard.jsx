import { useState, useEffect } from 'react';
import API from '../services/api';
import { 
  Plus, Search, Building2, MapPin, DollarSign, 
  Trash2, Edit2, CheckCircle2, Clock, XCircle, Send
} from 'lucide-react';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const initialFormState = {
    company: '',
    position: '',
    status: 'Applied',
    location: 'Remote',
    salary: 'N/A',
    notes: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpenModal = (job = null) => {
    if (job) {
      setEditingJob(job);
      setFormData(job);
    } else {
      setEditingJob(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingJob) {
        await API.put(`/jobs/${editingJob._id}`, formData);
      } else {
        await API.post('/jobs', formData);
      }
      setIsModalOpen(false);
      fetchJobs();
    } catch (err) {
      console.error('Error saving job:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await API.delete(`/jobs/${id}`);
        fetchJobs();
      } catch (err) {
        console.error('Error deleting job:', err);
      }
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.position.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const styles = {
      Applied: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      Screening: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      Interview: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      Offer: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      Rejected: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles.Applied}`}>
        {status}
      </span>
    );
  };

  // Metrics
  const total = jobs.length;
  const interviews = jobs.filter((j) => j.status === 'Interview').length;
  const offers = jobs.filter((j) => j.status === 'Offer').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">Total Applications</p>
            <p className="text-3xl font-bold text-white mt-1">{total}</p>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
            <Send className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">Interviews Scheduled</p>
            <p className="text-3xl font-bold text-white mt-1">{interviews}</p>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">Offers Received</p>
            <p className="text-3xl font-bold text-white mt-1">{offers}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <div className="flex flex-1 w-full md:w-auto gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search company or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Screening">Screening</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Application</span>
        </button>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-500">Loading your applications...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl text-center py-16 px-4">
          <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-slate-300">No applications found</h3>
          <p className="text-slate-500 text-sm mt-1">Start tracking by clicking "Add Application" above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div key={job._id} className="bg-slate-900 border border-slate-800 hover:border-slate-700 transition p-5 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-white">{job.position}</h3>
                    <p className="text-indigo-400 font-medium text-sm flex items-center gap-1.5 mt-0.5">
                      <Building2 className="w-4 h-4" />
                      {job.company}
                    </p>
                  </div>
                  {getStatusBadge(job.status)}
                </div>

                <div className="space-y-2 mt-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                {job.notes && (
                  <p className="mt-4 bg-slate-950 p-2.5 rounded text-xs text-slate-400 border border-slate-800/60 line-clamp-2">
                    {job.notes}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-slate-800/60">
                <button
                  onClick={() => handleOpenModal(job)}
                  className="p-1.5 text-slate-400 hover:text-indigo-400 transition"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 transition"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-lg shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingJob ? 'Edit Application' : 'Add New Application'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Position</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Screening">Screening</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Salary Range</label>
                <input
                  type="text"
                  placeholder="e.g. ₹8-12 LPA or $90k"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Notes</label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;