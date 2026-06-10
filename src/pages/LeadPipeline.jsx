import { useEffect, useState } from "react";
import {  DragDropContext,  Droppable,  Draggable,
} from "@hello-pangea/dnd";
import MainLayout from "../layouts/MainLayout";
import {  fetchCustomers,  updateCustomerStatus,
} from "../api/customers";
import "../styles/pipeline.css";

const LeadPipeline = () => {
  const [data, setData] = useState({
    lead: [],
    active: [],
    inactive: [],
  });

  const loadData = async () => {
    const res = await fetchCustomers();

    const grouped = {
      lead: [],
      active: [],
      inactive: [],
    };

    res.data.forEach((c) => {
      grouped[c.status].push(c);
    });

    setData(grouped);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const sourceItems = [...data[sourceCol]];
    const destItems = [...data[destCol]];

    const [movedItem] = sourceItems.splice(source.index, 1);

    movedItem.status = destCol;

    destItems.splice(destination.index, 0, movedItem);

    setData({
      ...data,
      [sourceCol]: sourceItems,
      [destCol]: destItems,
    });

    await updateCustomerStatus(movedItem.id, destCol);
  };

  const Column = ({ title, items, id }) => (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          className="pipeline-column"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h3>{title}</h3>

          {items.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={String(item.id)}
              index={index}
            >
              {(provided) => (
                <div
                  className="pipeline-card"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <h4>{item.fullName}</h4>
                  <p>{item.email}</p>
                  <span>{item.company}</span>
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <MainLayout>
      <div className="pipeline">

        <h1>Lead Pipeline</h1>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="pipeline-grid">

            <Column
              title="Leads"
              id="lead"
              items={data.lead}
            />

            <Column
              title="Active"
              id="active"
              items={data.active}
            />

            <Column
              title="Inactive"
              id="inactive"
              items={data.inactive}
            />

          </div>
        </DragDropContext>

      </div>
    </MainLayout>
  );
};

export default LeadPipeline;