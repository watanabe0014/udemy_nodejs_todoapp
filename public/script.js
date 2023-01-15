const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

// /api/v1/tasksからタスクを読み込む
const showTasks = async () => {
  loadingDOM.style.visibility = "visible";
  try {
    //自作のAPIを叩く
    const { data: tasks } = await axios.get("/api/v1/tasks");
    //タスクが１つもないとき
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">タスクがありません</h5>';
      loadingDOM.style.visibility = "hidden";
      return;
    }
    // console.log(tasks);

    //タスクを出力
    const allTasks = tasks
      .map((task) => {
        //console.log(task.name);
        const { completed, _id: taskID, name } = task;

        return `<div class="single-task ${completed && "task-completed"}">
        <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
    <div class="task-links">

    <!-- edit link -->
    <a href="task.html?id=${taskID}"  class="edit-link">
       <i class="fas fa-edit"></i>
    </a>

    <!-- delete btn -->
    <button type="button" class="delete-btn" data-id="${taskID}">
        <i class="fas fa-trash"></i>
    </button>
    </div>
    </div>`;
      })
      .join("");
    tasksDOM.innerHTML = allTasks;
  } catch (err) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">エラーです。もう一度やり直してください</h5>';
  }
  loadingDOM.style.visibility = "hidden";
};

showTasks(); //最初から全タスクを取得

//post
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value;

  try {
    await axios.post("/api/v1/tasks/", { name: name });
    showTasks();
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `タスクを追加しました`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `無効です。もう一度試してください。`;
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});

//delete
tasksDOM.addEventListener("click", async (e) => {
  const element = e.target;
  // console.log(element.parentElement);
  if (element.parentElement.classList.contains("delete-btn")) {
    loadingDOM.style.visibility = "visible";
    const id = element.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = "hidden";
});
