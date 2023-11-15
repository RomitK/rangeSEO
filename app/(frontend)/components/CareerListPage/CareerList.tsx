import { useGetAllCareerData } from "@/src/services/CareerService";

function CareerListPage() {
    const CareersData = useGetAllCareerData();
    console.log(CareersData);
    return (
        <>
        <ul>
        {CareersData.data?.map((career, index) => {
            return (
                <li key={career.id}>
                    <h1>{career.position}</h1>
                </li>
                );
            })
        }
        </ul>
        <h1>CareerListPage</h1>
        </>
        
    );
}
export default CareerListPage;