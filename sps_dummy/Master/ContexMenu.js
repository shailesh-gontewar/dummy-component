import React from 'react';

const ContextMenu = ({ top, left, handleAddRow, handleDeleteRow }) => {
  return (
    <div className="context-menu cl_pointer" style={{ top, left }}>
      <div className="context-menu-item cl_pointer">
        <button
          type="button"
          className="btn btn-outline-success btn-sm"
          onClick={handleAddRow}
        >
          <small>ADD NEW ROW</small>
        </button>
      </div>
      <div className="context-menu-item cl_pointer pt-1">
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={handleDeleteRow}
        >
           <small> DELETE ROW</small>
         
        </button>
      </div>
    </div>
  );
};

export default ContextMenu;
