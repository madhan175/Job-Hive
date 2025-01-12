import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import Navbar from './shared/Navbar';
import Job from './Job';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { allJobs } = useSelector((store) => store.job);

  // Extract search query from the URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';

  useEffect(() => {
    if (searchQuery) {
      dispatch(setSearchedQuery(searchQuery)); // Store the search query in Redux
    }
  }, [dispatch, searchQuery]);

  // Fetch all jobs
  useGetAllJobs();

  // Filter jobs based on the search query
  const filteredJobs = allJobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10 dark:text-white">
          Search Results for "{searchQuery}" ({filteredJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <Job key={job._id} job={job} />)
          ) : (
            <p className="dark:text-white">No jobs found for the search query.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
