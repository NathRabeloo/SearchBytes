// pages/bibliografia/page.tsx
'use client'

import { useState, useRef } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'

export default function Bibliografia() {
  const [file, setFile] = useState<File | null>(null)
  const [fileList, setFileList] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const [filteredFiles, setFilteredFiles] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  
  const [isDragOver, setIsDragOver] = useState(false)

  // Manipula a mudança no campo de pesquisa
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearch(query)
    filterFiles(query)
  }

  // Filtra os arquivos com base na pesquisa
  const filterFiles = (query: string) => {
    if (query === '') {
      setFilteredFiles(fileList)
    } else {
      setFilteredFiles(fileList.filter((file) => file.toLowerCase().includes(query.toLowerCase())))
    }
  }

  // Manipula o envio do arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  // Envia o arquivo para o servidor
  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('bibliografia', file)

    try {
      const res = await fetch('/api/bibliografia', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.fileName) {
        alert('Arquivo enviado com sucesso!')
        setFileList((prev) => [...prev, data.fileName])
        filterFiles(search)  // Atualiza a lista filtrada após o upload
      }
    } catch (error) {
      alert('Erro ao enviar arquivo.')
    }
  }

  // Baixa o arquivo selecionado
  const handleDownloadFile = (fileName: string) => {
    const link = document.createElement('a')
    link.href = `/uploads/${fileName}`
    link.download = fileName
    link.click()
  }

  // Função para lidar com o "drag over"
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  // Função para lidar com o "drop"
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }

  // Função para lidar com o fim do "drag"
  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  return (
    <div className="flex h-screen bg-[#a3bbd2]"> {/* Cor de fundo azul clarinho bebê */}
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto bg-[#bdc2c7] text-black"> {/* Alterado para fundo branco */}
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Biblioteca de Arquivos</h1>

        {/* Caixa de pesquisa */}
        <div className="mb-6 w-full max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Pesquisar arquivo..."
            value={search}
            onChange={handleSearch}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Upload de arquivo - Drag and Drop */}
        <div
          className={`mb-6 flex flex-col items-center space-y-4 p-8 border-2 border-dashed rounded-lg ${
            isDragOver ? 'border-blue-500' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          <p className="text-xl text-gray-700">Arraste e solte um arquivo aqui ou clique para selecionar</p>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Selecionar Arquivo
          </button>
          <button
            onClick={handleUpload}
            className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Subir Arquivo
          </button>
        </div>

        {/* Exibição dos arquivos em formato de cards */}
        <div className="grid grid-cols-3 gap-6">
          {filteredFiles.length === 0 ? (
            <p className="col-span-3 text-center text-gray-500">Nenhum arquivo encontrado.</p>
          ) : (
            filteredFiles.map((fileName) => (
              <div key={fileName} className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg">
                {/* Miniatura do arquivo */}
                <div className="h-32 w-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
                  <span>PDF</span> {/* A miniatura pode ser customizada para tipos de arquivos específicos */}
                </div>

                {/* Nome do arquivo */}
                <div className="mt-4 text-center">
                  <p className="text-lg font-semibold text-gray-700 truncate">{fileName}</p>
                </div>

                {/* Ações de download */}
                <div className="mt-4 text-center">
                  <button
                    onClick={() => handleDownloadFile(fileName)}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 w-full"
                  >
                    Baixar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
