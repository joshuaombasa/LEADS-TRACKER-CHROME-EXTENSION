let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

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

tabBtn.addEventListener("click", sortLead.collectDatafromCorrectTab)



deleteBtn.addEventListener("dblclick",sortLead.clearAllLeads)

inputBtn.addEventListener("click", sortLead.storeLeadToLocalStorage)

const sortLead = new HandleLeads()