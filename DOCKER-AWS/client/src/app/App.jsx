import React from 'react'
import {Editor} from '@monaco-editor/react'
import {MonacoBinding } from "y-monaco"
import {useRef, useMemo} from 'react'
import * as Y from 'yjs'
import {SocketIOProvider} from "y-socket.io"

const App = () => {
 const editorRef = useRef(null)

 const handleMount = (editor)=>{
       editorRef.current = editor;
 }

  return (
    <main className='h-screen w-full bg-gray-900 p-4 flex items-center justify-center gap-4'>
      <aside className='h-full w-1/4 bg-red-300 rounded-xl'>

      </aside>

      <section  className='h-full w-3/4 bg-yellow-100 rounded-xl'>
          
        <Editor 
        height="100%"
        defaultValue='// some comment'
        defaultLanguage='javascript'
        theme='vs-dark'
        />

      </section>
    </main>
  )
}

export default App
