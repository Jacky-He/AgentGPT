// import
import {
    TASK_STATUS_EXECUTING,
    TASK_STATUS_COMPLETED,
    TASK_STATUS_FINAL,
  } from "../src/types/agentTypes";
  
  function reorderTasks (state, startIdx, targetIdx) {
      if (startIdx < 0 || startIdx >= state.tasks.length || targetIdx < 0 || targetIdx >= state.tasks.length){
          return {...state};
        }
        const updatedTasks = Array.from(state.tasks);
        const [removed] = updatedTasks.splice(startIdx, 1);
        updatedTasks.splice(targetIdx, 0, removed!);
  
        return {
          ...state,
          tasks: updatedTasks,
        };
  }
  
  describe("Reordering tasks should properly reorder in state", () => {
      test("should work on normal case", () => {
          const state = {
              tasks: [
                  {
                      type: "task",
                      taskId: "task0",
                      info: "info0",
                      status: TASK_STATUS_FINAL,
                      value: "val0",
                  },
                  {
                      type: "task",
                      taskId: "task1",
                      info: "info1",
                      status: TASK_STATUS_EXECUTING,
                      value: "val1",
                  },
                  {
                      type: "task",
                      taskId: "task2",
                      info: "info2",
                      status: TASK_STATUS_COMPLETED,
                      value: "val2",
                  },
              ]
          }
          expect(state.tasks[0]!.taskId).toBe("task0");
          const newState = reorderTasks(state, 2, 0);
          expect(newState.tasks[0]!.taskId).toBe("task2");
      })

      test("should maintain task values on normal case", () => {
        const state = {
            tasks: [
                {
                    type: "task",
                    taskId: "task0",
                    info: "info0",
                    status: TASK_STATUS_FINAL,
                    value: "val0",
                },
                {
                    type: "task",
                    taskId: "task1",
                    info: "info1",
                    status: TASK_STATUS_EXECUTING,
                    value: "val1",
                },
                {
                    type: "task",
                    taskId: "task2",
                    info: "info2",
                    status: TASK_STATUS_COMPLETED,
                    value: "val2",
                },
            ]
        }
        expect(state.tasks[0]!.value).toBe("val0");
        const newState = reorderTasks(state, 2, 0);
        expect(newState.tasks[0]!.value).toBe("val2");
    })

      test("should work on identity case", () => {
        const state = {
            tasks: [
                {
                    type: "task",
                    taskId: "task0",
                    info: "info0",
                    status: TASK_STATUS_FINAL,
                    value: "val0",
                },
            ]
        }
        expect(state.tasks[0]!.taskId).toBe("task0");
        const newState = reorderTasks(state, 0, 0);
        expect(newState.tasks[0]!.taskId).toBe("task0");
    })

    test("should work on forward swap case", () => {
        const state = {
            tasks: [
                {
                    type: "task",
                    taskId: "task0",
                    info: "info0",
                    status: TASK_STATUS_FINAL,
                    value: "val0",
                },
                {
                    type: "task",
                    taskId: "task1",
                    info: "info1",
                    status: TASK_STATUS_EXECUTING,
                    value: "val1",
                },
            ]
        }
        expect(state.tasks[0]!.taskId).toBe("task0");
        expect(state.tasks[1]!.taskId).toBe("task1");
        const newState = reorderTasks(state, 0, 1);
        expect(newState.tasks[0]!.taskId).toBe("task1");
        expect(newState.tasks[1]!.taskId).toBe("task0");
    })

    test("should work on backward swap case", () => {
        const state = {
            tasks: [
                {
                    type: "task",
                    taskId: "task0",
                    info: "info0",
                    status: TASK_STATUS_FINAL,
                    value: "val0",
                },
                {
                    type: "task",
                    taskId: "task1",
                    info: "info1",
                    status: TASK_STATUS_EXECUTING,
                    value: "val1",
                },
            ]
        }
        expect(state.tasks[0]!.taskId).toBe("task0");
        expect(state.tasks[1]!.taskId).toBe("task1");
        const newState = reorderTasks(state, 1, 0);
        expect(newState.tasks[0]!.taskId).toBe("task1");
        expect(newState.tasks[1]!.taskId).toBe("task0");
    })
  })