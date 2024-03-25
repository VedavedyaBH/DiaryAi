import axios from "axios";
import { useState, useEffect } from "react";
import { useSearch } from "../Context/SearchContext";
import { useAuth } from "../Context/UserContext";
import { Card } from "../components/ProfileDisplayCard";

function FindProfiles() {
    const { query } = useSearch();
    const { token } = useAuth();
    const [profile, setProfile] = useState<any>([]);

    useEffect(() => {
        fetchProfiles();
    }, [query]);

    const fetchProfiles = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/socials/profile/users/find`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        query: query,
                    },
                }
            );
            const usersData = res.data;
            setProfile(usersData);
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <div>
            {profile.length === 0 ? (
                <div className="text-center p-4">
                    No user found for the entered username
                </div>
            ) : (
                <div className="max-w-3xl m-auto justify-center">
                    {profile.map((data: any) => (
                        <Card key={data.id} data={data} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default FindProfiles;
