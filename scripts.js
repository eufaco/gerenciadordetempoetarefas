        let tasks = [];
        let intervals = [];

        document.getElementById("taskForm").addEventListener("submit", function(event) {
            event.preventDefault();
            let taskName = document.getElementById("taskName").value;
            let taskDuration = document.getElementById("taskDuration").value;

            if (taskName && taskDuration) {
                tasks.push({
                    name: taskName,
                    duration: taskDuration * 60,
                    timeLeft: taskDuration * 60
                });
                updateTasksTable();
                document.getElementById("taskForm").reset();
            }
        });
        function updateTasksTable() {
            let table = document.getElementById("tasksTable");
            table.innerHTML = "<tr><th>Nome da Tarefa</th><th>Duração da Tarefa</th><th>Tempo Restante</th><th>Ações</th></tr>";
            for (let i = 0; i < tasks.length; i++) {
                let row = table.insertRow(-1);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
                cell1.innerHTML = tasks[i].name;
                cell2.innerHTML = formatTime(tasks[i].duration);
                cell3.innerHTML = formatTime(tasks[i].timeLeft);
                cell4.innerHTML = "<button class='button' onclick='iniciarTask(" + i + ")'>Iniciar</button> " +
                                  "<button class='button' onclick='pausarTask(" + i + ")'>Pausar</button> " +
                                  "<button class='button' onclick='pararTask(" + i + ")'>Parar</button> " +
                                  "<button class='button' onclick='editarTask(" + i + ")'>Editar</button> " +
                                  "<button class='button' onclick='deletarTask(" + i + ")'>Deletar</button>";
            }
        }
        function iniciarTask(index) {
            clearInterval(intervals[index]);
            intervals[index] = setInterval(function() {
                if (tasks[index].timeLeft > 0) {
                    tasks[index].timeLeft--;
                    updateTasksTable();
                } else {
                    clearInterval(intervals[index]);
                }
            }, 1000);
        }
        function pausarTask(index) {
            clearInterval(intervals[index]);
        }
        function pararTask(index) {
            clearInterval(intervals[index]);
            tasks[index].timeLeft = tasks[index].duration;
            updateTasksTable();
        }
        function editarTask(index) {
            let newName = prompt("Enter new task name:", tasks[index].name);
            let newDuration = prompt("Enter new task duration (in minutes):", tasks[index].duration / 60);

            if (newName && newDuration) {
                tasks[index].name = newName;
                tasks[index].duration = newDuration * 60;
                tasks[index].timeLeft = newDuration * 60;
                updateTasksTable();
            }
        }
        function deletarTask(index) {
            tasks.splice(index, 1);
            updateTasksTable();
        }
        function formatTime(seconds) {
            let date = new Date(null);
            date.setSeconds(seconds);
            return date.toISOString().substr(11, 8);
        }
   