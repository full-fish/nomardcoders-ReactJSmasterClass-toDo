import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Categories, categoryState, toDoSelector } from '../atoms'
import CreateToDo from './CreateToDo'
import ToDo from './ToDo'
import { useForm } from 'react-hook-form'

function ToDoList() {
  const { register, handleSubmit, watch } = useForm()
  const toDos = useRecoilValue(toDoSelector)
  const [category, setCategory] = useRecoilState(categoryState)
  // const [data, setData] = useRecoilState(dataState)
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any)
  }
  // const setData = () => {}
  const onValid = () => {
    let name = watch().add
    console.log(name)
    console.log('Categories', Categories)
    console.log('toDos', toDos)

    return {
      ...Categories,
      [name]: [],
    }
  }
  // setCategory(Categories => {
  //   return {
  //     ...Categories,
  //   }
  // })
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register('add')}></input>
      </form>
      <h1>To Dos</h1>
      <hr />

      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map(toDo => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  )
}

export default ToDoList
