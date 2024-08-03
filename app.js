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

    const handleSubmit = (event) => {
        event.preventDefault();
        const startDate = new Date(selectedCourse.startDate);
        const now = new Date();
        const difference = startDate - now;
        setCountdown(Math.ceil(difference / (1000 * 60 * 60 * 24)));
        setEnrollmentFormVisible(false);
    };

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