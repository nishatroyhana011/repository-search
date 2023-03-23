import React, { useEffect, useState } from 'react';
import Repositories from './Repositories';

type profile = {
    login: string,
    repos_url: string
}
type repo = {
    name: string,
    description: string
}
const Profile = (props: { person: profile }) => {
    const [result, setResult] = useState<repo[]>([])

    useEffect(() => {
        fetch(`${props.person.repos_url}`)
            .then(res => res.json())
            .then(data => setResult(data))
    }, [props.person.repos_url])

    return (
        <div>
            <details className="w-full border rounded-lg my-2 bg-slate-100">
                <summary className="px-4 py-6">{props.person.login}</summary>
                {
                    result.length > 0 ?
                        result?.map((repository) => <Repositories repository={repository}></Repositories>)
                        : <p className='text-gray-500'> No repository found</p>
                }
            </details>
        </div>
    );
};

export default Profile;