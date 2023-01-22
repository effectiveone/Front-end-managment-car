import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "react-uuid";
import Layout from "../shared/components/Layout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, fetchMyTasks } from "../store/actions/taskActions";
import { addCoins } from "../store/actions/walletActions";

const onDragEnd = (
  result,
  columns,
  setColumns,
  handleUpdateTask,
  handleGrantBonus,
  mail,
  token,
  tasks
) => {
  console.log("columns", columns);
  if (!result.destination) return;
  const { source, destination, draggableId } = result;
  handleUpdateTask(draggableId, mail, destination.droppableId);

  if (destination.droppableId === "Done") {
    const coins = tasks.tasks?.find(
      ({ _id }) => _id === draggableId
    ).coinsToEarn;

    handleGrantBonus(coins, mail, token);
  }

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function MyTasks() {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.task?.myTasks);
  const user = useSelector((state) => state.auth.user);

  const localUser = JSON.parse(localStorage.getItem("user"));
  const { mail, token } = localUser;
  const [currentCard, setCurrentCard] = useState([]);
  useEffect(() => {
    // if (!tasks?.tasks?.length) {
    dispatch(fetchMyTasks(localUser.mail));
    // }
  }, []);

  useEffect(() => {
    setCurrentCard(tasks?.tasks);
  }, [tasks, dispatch]);

  const handleUpdateTask = (_id, responsivePerson, status) => {
    dispatch(updateTask(_id, responsivePerson, status));
  };

  const handleGrantBonus = (coins, mail, token) => {
    dispatch(addCoins(coins, mail, token));
  };

  useEffect(() => {
    if (tasks?.tasks) {
      setColumns({
        ["Requested"]: {
          name: "Requested",
          background: "green",
          items: tasks.tasks.filter((p) => p.status === "Requested"),
        },
        ["To do"]: {
          name: "To do",
          background: "red",
          items: tasks.tasks.filter((p) => p.status === "To do"),
        },
        ["In Progress"]: {
          name: "In Progress",
          background: "blue",
          items: tasks.tasks.filter((p) => p.status === "In Progress"),
        },
        ["Done"]: {
          name: "Done",
          background: "purple",
          items: tasks.tasks.filter((p) => p.status === "Done"),
        },
      });
    }
  }, [tasks]);
  const [columns, setColumns] = useState([]);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          marginTop: "50px",
        }}
      >
        <DragDropContext
          onDragEnd={(result) =>
            onDragEnd(
              result,
              columns,
              setColumns,
              handleUpdateTask,
              handleGrantBonus,
              mail,
              token,
              tasks
            )
          }
        >
          {Object.entries(columns)?.map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "550px",
                  margin: "0 20px 0 20px",
                  backgroundColor: column.background,
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column?.items?.map((item, index) => {
                            return (
                              <Draggable
                                key={uuid()}
                                draggableId={item._id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                        }}
                                      >
                                        <span> {item.title}</span>
                                        <p> {item.description}</p>
                                      </div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </Layout>
  );
}

export default MyTasks;
