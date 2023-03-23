import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import Profile from './Profile';

type profile = {
    login: string,
    repos_url: string
}

const Home = () => {
    const [keyWord, setKeyword] = useState<string>('')
    const [result, setResult] = useState<profile[]>([])
    const [isLoading, setLoading] = useState(false);

    const handleSearch = (e: any) => {
        e.preventDefault();
         setLoading(true)
        setKeyword(e.target.search.value)
    }
    useEffect(() => {
        fetch(`https://api.github.com/search/users?q=${keyWord}&per_page=5`)
            .then(res => res.json())
            .then(data => {
                setResult(data?.items)
                setLoading(false)
            })
    }, [keyWord])

    return (

        <div className='w-11/12 md:w-3/5 lg:w-1/2 xl:w-2/5 mx-auto mt-10 bg-white lg:p-10 md:p-10 p-5 rounded-lg shadow-md shadow-indigo-500/50'>
            <form onSubmit={handleSearch} className="w-full space-y-5 dark:text-gray-100">
                <label className="block">
                    <p className="text-gray-600 text-xs uppercase my-2 text-start">
                        Github Username
                    </p>
                    <input type="text" name="search" required placeholder="Enter username" className="mt-3 px-3 py-3 border-2 shadow-sm focus:outline-none border-blue-300 bg-transparent focus:bg-slate-100 placeholder-slate-600  block w-full rounded-md  " />
                </label>
                <button type="submit" className="bg-gradient-to-r from-[#6069d3ef] to-[#67f6f3c9] py-3 text-white text-xl font-medium rounded-md mt-2 w-full">Search</button>
            </form>
            {
                keyWord ?
                    <p className='text-sm text-gray-600 text-start mt-2'>Showing users for '{keyWord}'</p>
                    : ''
            }
            {   
                isLoading ? <Loading /> :
                result !== undefined && result.length === 0
                    ? <p className='text-gray-500'> No Data found</p>
                    : result?.map(person => <Profile person={person}></Profile>)
            }
        </div>

    );
};

export default Home;