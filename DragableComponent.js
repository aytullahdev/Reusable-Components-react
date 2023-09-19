import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const [sectionPosition, setSectionPositions] = useState(Object.keys(templateData).map((id) => ({ "id": id + "drage", "sectionName": id })))

   const handleOnDragEnd = (result) => {
        if ((!result.destination.index || !result.source.index) && (result.destination.index !== 0 && result.source.index !== 0)) return;
        const items = Array.from(sectionPosition);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem)
        setSectionPositions(items);
    };


<DragDropContext onDragEnd={handleOnDragEnd} >
                <Droppable droppableId="sections">
                    {(provided) => (
                        <div className='col-span-5 ' {...provided.droppableProps} ref={provided.innerRef}>
                            {sectionPosition.map(({ sectionName, id }, indx) => {
                                return (
                                    <Draggable key={id} draggableId={id} index={indx}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <EditSection templateData={templateData} sectionName={sectionName} setTemplateData={setTemplateData} />
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
