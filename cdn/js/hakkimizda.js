    document.addEventListener("DOMContentLoaded", () => {
        const columns = document.querySelectorAll(".column");
        let activeWrap = null;
      
        columns.forEach((column, index) => {
          column.addEventListener("click", () => {
            const wrap = document.getElementById(`wrap${index + 1}`);
      
            if (activeWrap && activeWrap !== wrap) {
              activeWrap.classList.remove("open");
            }
      
            wrap.classList.toggle("open");
            activeWrap = wrap.classList.contains("open") ? wrap : null;
          });
        });
      });

