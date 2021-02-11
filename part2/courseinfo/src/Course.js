const Header = ({ course }) => {
    return <h1>{course.name}</h1>;
};

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    );
};

const Total = ({ course }) => {
    const { parts } = course;
    const total = parts.reduce(
        (acc, currentPart) => acc + currentPart.exercises,
        0
    );
    return <strong>total of {total} exercises</strong>;
};

const Content = ({ course }) => {
    const { parts } = course;
    return (
        <div>
            {parts.map((part) => (
                <Part part={part} key={part.id} />
            ))}
        </div>
    );
};

export const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    );
};
