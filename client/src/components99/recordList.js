import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Record = ({record,deleteRecord}) => {
    return (
        <tr>
            <td>{record.recordName}</td>
            <td>{record.position}</td>
            <td>{record.level}</td>
            <td>
                <Link className="btn btn-link" to={`/edit/${record._id}`}>Edit</Link> |
                <button
                    className="btn btn-link"
                    onClick={() => {
                        deleteRecord(record._id)
                    }}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default function RecordList() {
    const [records, setRecords] = useState([])

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:4900/record/`)

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`
                window.alert(message)
                return
            }

            const records = await response.json()
            setRecords(records)
        }

        getRecords()

        return
    }, [records.length])

    async function deleteRecord(id) {
        const result = window.confirm("Will this employee be removed from the list?")
        if (!result) {
            return
        }

        await fetch(`http://localhost:4900/record/${id}`, {
            method: "DELETE"
        })

        const newRecords = records.filter((record) => record._id !== id)
        setRecords(newRecords)
    }

    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    key={record._id}
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                />
            )
        })
    }

    return (
        <div>
            <h3 className="ps-2">Record List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    )
}