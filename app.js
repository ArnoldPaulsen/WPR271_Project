const courses = [
    { id: 1, name: "Higher Certificate", startDate: "2024-09-01", description: "A foundational program to kickstart your career." },
    { id: 2, name: "Diploma", startDate: "2024-10-01", description: "Advance your skills with our comprehensive diploma program." },
    { id: 3, name: "BIT", startDate: "2024-11-01", description: "Bachelor of Information Technology for the tech-savvy." },
    { id: 4, name: "BCOM", startDate: "2024-12-01", description: "Bachelor of Commerce for future business leaders." },
];

function App() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedCourse, setSelectedCourse] = React.useState(null);
    const [enrollmentFormVisible, setEnrollmentFormVisible] = React.useState(false);
    const [countdown, setCountdown] = React.useState(null);

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
        setEnrollmentFormVisible(false);
    };

    const handleEnroll = () => {
        setEnrollmentFormVisible(true);
    };

     function displayCountdown(startDate) {
            let countdownDiv = document.getElementById('countdown');
            countdownDiv.innerHTML = ''; // Clear any existing countdown
            let interval = setInterval(function() {
                let now = new Date().getTime();
                let distance = startDate - now;

                if (distance < 0) {
                    clearInterval(interval);
                    countdownDiv.textContent = "Course has started!";
                    return;
                }

                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let  hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let secs = Math.floor((distance % (1000 * 60)) / 1000);

                countdownDiv.textContent = `Course starts in ${days}d ${hrs}h ${mins}m ${secs}s`;
            }, 1000);
        }

    return (
        <div>
            <div className="hero">
                <div className="hero-content">
                    <h1>Welcome to Education College</h1>
                    <p>Empowering minds, shaping futures</p>
                </div>
            </div>
            <h2>Our Courses</h2>
            <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="course-list">
                {filteredCourses.map(course => (
                    <div key={course.id} className="course-card">
                        <h3>{course.name}</h3>
                        <p>{course.description}</p>
                        <button onClick={() => handleCourseSelect(course)}>View Details</button>
                    </div>
                ))}
            </div>
            {selectedCourse && (
                <div className="course-details">
                    <h3>{selectedCourse.name} Details</h3>
                    <p>{selectedCourse.description}</p>
                    <p>Start Date: {selectedCourse.startDate}</p>
                    <button onClick={handleEnroll}>Enroll Now</button>
                </div>
            )}
            {enrollmentFormVisible && (
                <form onSubmit={handleSubmit}>
                    <h3>Enroll in {selectedCourse.name}</h3>
                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="tel" placeholder="Phone Number" required />
                    <button type="submit">Submit Application</button>
                </form>
            )}
            {countdown !== null && (
                <p>Congratulations! Your course starts in {countdown} days!</p>
            )}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
