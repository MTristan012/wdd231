const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to programming.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to web design.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to write and use functions in programming.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course covers object-oriented programming concepts.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to create dynamic websites with JavaScript.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students focus on user experience and frontend optimization.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

function displayCourses(courseArray) {
    const courseListDiv = document.querySelector('#course-list');
    courseListDiv.innerHTML = '';

    courseArray.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.textContent = `${course.title} - ${course.credits} credits`;

        if (course.completed) {
            const checkMark = document.createElement('span');
            checkMark.textContent = ' ✔️';
            courseItem.appendChild(checkMark);
        }

        courseListDiv.appendChild(courseItem);
    });

    updateCreditsDisplay(courseArray);
}

function filterCourses(subject) {
    if (subject === 'All') {
        displayCourses(courses);
    } else {
        const filteredCourses = courses.filter(course => course.subject === subject);
        displayCourses(filteredCourses);
    }
}

function calculateTotalCredits(courseArray) {
    return courseArray
        .filter(course => course.completed)
        .reduce((total, course) => total + course.credits, 0);
}

function updateCreditsDisplay(courseArray) {
    const totalCredits = calculateTotalCredits(courseArray);
    document.querySelector('#total-credits').textContent = `Total Credits: ${totalCredits}`;
}

document.querySelector('#filter-all').addEventListener('click', () => filterCourses('All'));
document.querySelector('#filter-cse').addEventListener('click', () => filterCourses('CSE'));
document.querySelector('#filter-wdd').addEventListener('click', () => filterCourses('WDD'));

displayCourses(courses);