import { useState } from 'react';

const YourComponent = () => {
  const [examWiseSubject, setExamWiseSubject] = useState([]);

  const handleCheckboxChange = (categoryIndex, subjectIndex) => {
    setExamWiseSubject((prevSubjects) => {
      const updatedSubjects = [...prevSubjects];
      updatedSubjects[categoryIndex].exam_subject[subjectIndex].is_selected =
        !updatedSubjects[categoryIndex].exam_subject[subjectIndex].is_selected;
      return updatedSubjects;
    });
  };

  const handleInputChange = (categoryIndex, subjectIndex, fieldName, value) => {
    setExamWiseSubject((prevSubjects) => {
      const updatedSubjects = [...prevSubjects];
      updatedSubjects[categoryIndex].exam_subject[subjectIndex][fieldName] = value;
      return updatedSubjects;
    });
  };

  const handleSubmit = () => {
    // Make your API call with the updated examWiseSubject data
    console.log('Sending data to the server:', examWiseSubject);
    // Add your API call logic here
  };

  return (
    <div>
      {examWiseSubject?.map((exam, categoryIndex) => (
        <div key={categoryIndex} className="card">
          <div className="card-header">
            <h3 className="card-title">Category: {exam.category_name}</h3>
          </div>
          <div className="card-body row">
            {exam?.exam_subject?.map((sub, subjectIndex) => (
              <div className="col-lg-4 col-md-6 px-5" key={subjectIndex}>
                <div className="form-group row">
                  <div className="col-md-6">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={sub.is_selected}
                      onChange={() => handleCheckboxChange(categoryIndex, subjectIndex)}
                    />
                    <label className="form-check-label" htmlFor={`checkbox${subjectIndex}`}>
                      {sub.fk_subject__subject_name}
                    </label>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Min Mark"
                      name="min_marks"
                      value={sub.min_marks}
                      onChange={(e) => handleInputChange(categoryIndex, subjectIndex, 'min_marks', e.target.value)}
                    />
                    <small className="form-text">Min Mark</small>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Max Mark"
                      name="max_marks"
                      value={sub.max_marks}
                      onChange={(e) => handleInputChange(categoryIndex, subjectIndex, 'max_marks', e.target.value)}
                    />
                    <small className="form-text">Max Mark</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default YourComponent;
let subList = examWiseSubject?.map((exam) => ({
  exam_categoryId: exam.exam_categoryId,
  category_name: exam.category_name,
  marking: exam.marking,
  exam_subject: exam?.exam_subject?.map((sub) => ({
    id: sub.id,
    is_selected: sub.is_selected,
    min_marks: sub.min_marks,
    max_marks: sub.max_marks,
    grade: sub.grade,
  })),
}));