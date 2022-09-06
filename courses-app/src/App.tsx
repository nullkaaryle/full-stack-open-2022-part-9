const App = () => {

  const courseName = "Half Stack application development";


  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CoursePartWithDescription extends CoursePartBase {
    description: string
  }

  interface CourseNormalPart extends CoursePartWithDescription {
    type: "normal";
  }

  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CoursePartWithDescription {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseSpecialPart extends CoursePartWithDescription {
    type: "special";
    requirements: string[];
  }

  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  const Header = ({ courseName }: { courseName: string }): JSX.Element => {
    return (
      <div>
        <h1>
          {courseName}
        </h1>
      </div>
    )
  };


  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const NormalPart = ({ part }: { part: CourseNormalPart }): JSX.Element => {
    return (
      <div>
        <b>
          {part.name} {part.exerciseCount}
        </b>
        <p>
          <i>
            {part.description}
          </i>
        </p>
        <br></br>
      </div>
    )
  };

  const SubmissionPart = ({ part }: { part: CourseSubmissionPart }): JSX.Element => {
    return (
      <div>
        <b>
          {part.name} {part.exerciseCount}
        </b>
        <p>
          <i>
            {part.description}
          </i>
        </p>
        <p>
          Submit to {part.exerciseSubmissionLink}
        </p>
        <br></br>
      </div >
    )
  };

  const GroupProjectPart = ({ part }: { part: CourseProjectPart }): JSX.Element => {
    return (
      <div>
        <b>
          {part.name} {part.exerciseCount}
        </b>
        <p>
          Project exercises: {part.groupProjectCount}
        </p>
        <br></br>
      </div>
    )
  };

  const SpecialPart = ({ part }: { part: CourseSpecialPart }): JSX.Element => {
    return (
      <div>
        <b>
          {part.name} {part.exerciseCount}
        </b>
        <p>
          <i>
            {part.description}
          </i>
        </p>
        <p>
          Project requirements:
          {part.requirements.map((requirement) => (
            <li key={requirement}>
              {requirement}
            </li>
          ))}
        </p >
        <br></br>
      </div >
    )
  };

  const Part = ({ part }: { part: CoursePart }): JSX.Element => {
    switch (part.type) {
      case 'normal':
        return (
          <NormalPart part={part} />
        )
        break;
      case 'groupProject':
        return (
          <GroupProjectPart part={part} />
        )
        break;
      case 'submission':
        return (
          <SubmissionPart part={part} />
        )
        break;
      case 'special':
        return (
          <SpecialPart part={part} />
        )
        break;
      default:
        return assertNever(part);
    }
  }

  const Content = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
    return (
      <div>
        {courseParts.map((part) => (< Part key={part.name} part={part} />))}
      </div>
    )
  };

  const Total = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
    return (
      <div>
        <h3>
          Number of exercises:{" "}
          {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </h3>
      </div >
    )
  };

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />

    </div>
  );

};

export default App;
