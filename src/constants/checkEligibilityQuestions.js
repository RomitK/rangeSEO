const QUESTIONS = [
    {
        id: 1,
        question: "Are you a resident of the UAE?",
    },
    {
        id: 2,
        question: "Are you one of the investors in the country who meet one of the below conditions?",
        visas: [0],
        data: [
            "A deposit owner of no less than (2,000,000) AED with an investment fund licensed in the UAE.",
            "Or, a company owner with a minimum capital of (2,000,000) AED.",
            "Or, a share owner in a company worth no less than (2,000,000) AED.",
            "Or, a company owner or a partner that pays taxes of no less than (250,000) AED annually.",
        ],
    },
    {
        id: 3,
        question:
            "Do you own one property or more whose total value is not less than (2,000,000) AED and are not subject to any mortgage?",
        visas: [1],
    },
    {
        id: 4,
        question: "Do you have a successful previous project in the country with a capital of at least (500,000) AED?",
        visas: [2],
    },
    {
        id: 5,
        question:
            "Are you a distinguished high school graduate who was among the top achievers, with a grade of excellence or 95% from one of the high schools in the UAE?",
        visas: [3],
    },
    {
        id: 6,
        question:
            "Are you one of the outstanding university graduates who graduated from accredited universities in the country with a GPA of no less than (3.8)?",
        visas: [4],
    },
    {
        id: 7,
        question:
            "Are you a doctor who licenses to practice the profession from approved government agencies in the UAE, and are you currently on the job?",
        visas: [5],
    },
    {
        id: 8,
        question: "Are you a specialist in engineering and science and on the job of one of these fields?",
        visas: [6, 7, 8, 9, 10],
        data: [
            "Epidemiology and Viruses",
            "Artificial intelligence",
            "Big data",
            "Computer Engineering",
            "Electronic Engineering",
            "Software Engineering",
            "Electrical Engineering",
            "Genetic Engineering",
            "Biotechnology Engineering",
        ],
    },
    {
        id: 9,
        question:
            "Are you a creative person who has produced distinguished and tangible artistic productions in the UAE or abroad?",
        visas: [11],
        data: [
            "The fields include visual arts, publishing, performing arts, designs and crafts, games and e-sports, media, and others.",
        ],
    },
    {
        id: 10,
        question: "Are you an innovator with a patent that will add value to the United Arab Emirates economy?",
        visas: [12],
    },
    {
        id: 11,
        question: "Are you a president or CEO working in a private/public sector in the UAE?",
        visas: [13],
        data: [
            "To be eligible for this category, you must have a bachelor's degree, a valid employment contract, and meet the following criteria: monthly salary of at least (30,000) AED, skilled labor classification in the first or second professional level approved by the Ministry of Human Resources and Emiratisation.",
        ],
    },
    {
        id: 12,
        question: "Are you specialized in one of the rare educational fields of priority in the United Arab Emirates?",
        visas: [14],
        data: [
            "To be eligible for this residency, you must have a university degree with a bachelor's degree in one of the priority fields or specializations, which include: education, training, management, and caring for people of determination",
        ],
    },
    {
        id: 13,
        question:
            "Are you an athlete, coach, referee, sports doctor, sports therapist, or public sports figure, with tangible sporting achievements in the UAE or abroad?",
        visas: [15],
    },
    {
        id: 14,
        question: "Do you hold a PhD in one of the priority fields and are you currently working in it?",
        visas: [16],
    },
    {
        id: 15,
        question: "Are you a pioneers of humanitarian work from one of the following categories?",
        visas: [17],
        data: [
            "Members of international and regional organizations, or distinguished workers in them, for a period of not less than (5) years.",

            "Members of public benefit associations and institutions, or distinguished workers in them, for a period of not less than (5) years.",

            "Recipients of appreciation awards from one of the local, regional, or international institutions specialized in humanitarian work.",

            "Distinguished volunteers in the field of humanitarian work, for a period of not less than (5) years or (500) volunteer hours.",

            "Financial supporters of humanitarian work with a value of no less than (2,000,000) million AED or its equivalent.",
        ],
    },
];

export default QUESTIONS;
