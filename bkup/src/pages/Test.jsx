import React from 'react'

const Test = () => {
  return (
    <>
      <section className="to-do-section">
        <div className="container">
          <div className="row">
            <h1>TodoTrek</h1>
            <div className="task-field">
              <input className="input-field" type="text" placeholder="New Task..."/>
              <button className="task-entry-button">
                Add
              </button>
            </div>
            <div className="to-do-information">
              <h2>My List</h2>
              <ul className="to-do-information_counter">
                <li className="list">
                  <div className="task-container">
                    <input type="checkbox" />
                    <span className="task">task</span>
                  </div>
                  <div className="icon-background">
                  <i class="bi bi-trash" style={{fontSize: 18}}></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default Test