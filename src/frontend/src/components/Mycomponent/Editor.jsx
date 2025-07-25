/* eslint-disable react/prop-types */
import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const TextInputer = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
    ],
  };

  const editorStyle = {
    height: "400px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const containerStyle = {
    maxWidth: "80%",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Text Editor</h2>
      <ReactQuill 
        modules={modules}
        value={value}
        onChange={onChange}
        style={editorStyle}
      />
    </div>
  );
};

export default TextInputer;







// /* eslint-disable react/prop-types */
// import ReactQuill from "react-quill";
// import 'react-quill/dist/quill.snow.css';



// const TextInputer =({value,onChange}) => {
// const  modules = {
//         toolbar: [
//           [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//           ['bold', 'italic', 'underline', 'strike'],
//           ['blockquote', 'code-block'],
//           [{ 'header': 1 }, { 'header': 2 }],
//           [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//           [{ 'script': 'sub' }, { 'script': 'super' }],
//           [{ 'indent': '-1' }, { 'indent': '+1' }],
//           ["link", "image", "video"],
//           [{ 'direction': 'rtl' }],
//           [{ 'size': ['small', false, 'large', 'huge'] }],
//           [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//           [{ 'color': [] }, { 'background': [] }],
//           [{ 'font': [] }],
//           [{ 'align': [] }],
//           ['clean']
//         ],
        
//       };
//       const editorStyle = {
//         height: "400px"
//       }
  
//   return(<>
//     <ReactQuill 
//      modules ={modules}
//      value={value}
//      onChange={onChange}
//      style={editorStyle}
//     />
//   </>
    
//   )
// }

// export default TextInputer;