// FormBuilder.js
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IoDocumentText } from 'react-icons/io5';
import { BsCalendarDateFill } from 'react-icons/bs';
import { TbSquareNumber1 } from 'react-icons/tb';
import { TextField, DatePicker, SpinButton } from '@fluentui/react';

const initialFormElements = [
  { id: 'text-input', content: 'Number', type: 'number', icons: <TbSquareNumber1 className='text-2xl' /> },
  { id: 'checkbox', content: 'Date time', type: 'datetime', icons: <BsCalendarDateFill className='text-2xl' /> },
  { id: 'radio-button', content: 'Text Field', type: 'textfield', icons: <IoDocumentText className='text-2xl' /> },
];

const FormBuilder = () => {
  const [formElements, setFormElements] = useState(initialFormElements);
  const [createdForm, setCreatedForm] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (result) => {
    setIsDragging(false);

    if (!result.destination) return;

    const sourceElement = formElements.find((element) => element.id === result.draggableId);

    if (sourceElement) {
      const newCreatedFormElement = {
        id: `${sourceElement.id}-${createdForm.length + 1}`,
        content: sourceElement.content,
        type: sourceElement.type,
      };

      setCreatedForm((prevCreatedForm) => [...prevCreatedForm, newCreatedFormElement]);
    }
  };

  return (
    <div className="h-screen w-[100%] bg-white flex relative">
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="w-[20%] bg-blue-500 p-2 flex flex-col">
          <h2 className="text-white font-semibold text-lg">Welcome to</h2>
          <h1 className="text-orange-400 font-bold text-3xl">taskpedia</h1>
          <h3 className="text-white font-semibold text-md mt-10">Components</h3>
          <Droppable droppableId="availableFormElements" type="element">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex gap-2"
              >
                {formElements.map((element, index) => (
                  <Draggable key={element.id} draggableId={element.id} index={index}>
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="p-2 rounded-md bg-white flex flex-col gap-2 justify-center items-center"
                      >
                        {element.icons}
                        <p className="text-black text-xs font-semibold">{element.content}</p>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>

        <Droppable droppableId="createdForm" type="element">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-1/2 p-4"
            >
            <h2 className="text-lg font-semibold mb-4">Standard Field</h2>
            <form>
                <TextField 
                    className='w-[100%] border-slategray text-slategray focus:border-blue-500 focus:text-black'
                    label='Title'
                    required
                />
                <TextField 
                    className='w-[100%]'
                    label='Description'
                    required
                />
            </form>
            <h2 className="text-lg font-semibold mb-4 mt-5">Optional Field</h2>
              <form>
                {createdForm.map((formElement, index) => (
                  <div key={formElement.id} className="mb-2">
                    {formElement.type === 'number' && (
                      <SpinButton
                        label={formElement.content}
                        className="flex flex-col"
                      />
                    )}
                    {formElement.type === 'datetime' && (
                      <DatePicker
                        label={formElement.content}
                        className="flex flex-col"
                      />
                    )}
                    {formElement.type === 'textfield' && (
                      <TextField
                        label={formElement.content}
                        className="flex flex-col"
                      />
                    )}
                  </div>
                ))}
                <div className={`w-1/2 p-4 ${snapshot.isDraggingOver ? 'border-2 border-dashed border-orange-500 w-[100%]' : ''}`}></div>
              </form>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default FormBuilder;
