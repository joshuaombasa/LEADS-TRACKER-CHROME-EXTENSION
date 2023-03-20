const myVariables = {
myLeads : [],
inputEl : document.getElementById("input-el"),
inputBtn : document.getElementById("input-btn"),
ulEl : document.getElementById("ul-el"),
deleteBtn : document.getElementById("delete-btn"),
leadsFromLocalStorage : JSON.parse( localStorage.getItem("myLeads") ),
tabBtn : document.getElementById("tab-btn")
}

const {myLeads, inputEl, inputBtn, ulEl, deleteBtn, leadsFromLocalStorage, tabBtn} = myVariables



if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


function HandleLeads() {

    this.clearAllLeads = () => {
        localStorage.clear()
        myLeads = []
        render(myLeads)
    }

    this.collectDatafromCorrectTab = () =>{    
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads) )
            render(myLeads)
        })
    }

    this.storeLeadToLocalStorage = () => {
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    }

    this.render = (leads) => {
        let listItems = ""
        for (let i = 0; i < leads.length; i++) {
            listItems += `
                <li>
                    <a target='_blank' href='${leads[i]}'>
                        ${leads[i]}
                    </a>
                </li>
            `
        }
        ulEl.innerHTML = listItems
    }
}

const sortLead = new HandleLeads()

sortLead.render()

tabBtn.addEventListener("click", sortLead.collectDatafromCorrectTab)

deleteBtn.addEventListener("dblclick",sortLead.clearAllLeads)

inputBtn.addEventListener("click", sortLead.storeLeadToLocalStorage)

