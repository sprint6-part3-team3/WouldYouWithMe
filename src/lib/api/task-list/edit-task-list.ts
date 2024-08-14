import axios, { AxiosResponse } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import { GroupTask } from "@/types/group";
import { TaskListAddEditInput } from "@/types/task-list";

import instance from "../axios-instance";

// 팀 목록 수정 PATCH 요청
const editTaskList = async (
  data: TaskListAddEditInput,
  groupId: number,
  id: number,
): Promise<GroupTask> => {
  try {
    const res: AxiosResponse<GroupTask> = await instance.patch(
      `/groups/${groupId}/task-lists/${id}`,
      data,
    );
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data;
    } else {
      throw new Error(OTHER_TYPE_ERROR);
    }
  }
};

export default editTaskList;