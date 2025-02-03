'use client'
import { useState } from 'react'
import * as XLSX from 'xlsx'
import Sidebar from '../components/Sidebar/Sidebar'

export default function ModeloPlanilha() {
  const [fields, setFields] = useState<{
    nome: string
    ra: string
    atividades: { atividade: string; nota: string; peso: string }[]
    media: number
  }[]>([
    { nome: '', ra: '', atividades: [{ atividade: '', nota: '', peso: '' }], media: 0 },
  ])

  // Função para calcular a média ponderada das atividades
  const calcularMedia = (atividades: { nota: string; peso: string }[]) => {
    const pesoTotal = atividades.reduce((soma, atividade) => soma + Number(atividade.peso), 0)
    const notaPonderada = atividades.reduce(
      (soma, atividade) => soma + Number(atividade.nota) * Number(atividade.peso),
      0
    )
    return pesoTotal > 0 ? notaPonderada / pesoTotal : 0
  }

  // Função para lidar com a alteração dos campos
  const handleFieldChange = (
    index: number,
    campo: string,
    valor: string,
    atividadeIndex?: number
  ) => {
    const novosCampos = [...fields]

    if (atividadeIndex !== undefined) {
      // Se for uma mudança em atividade ou peso ou nota, atualiza a atividade específica
      novosCampos[index].atividades[atividadeIndex][campo] = valor
    } else {
      novosCampos[index][campo] = valor
    }

    // Recalcular a média de cada aluno após a alteração
    if (campo === 'nota' || campo === 'peso') {
      novosCampos[index].media = calcularMedia(novosCampos[index].atividades)
    }

    setFields(novosCampos)
  }

  // Função para adicionar uma nova atividade
  const handleAddActivity = (index: number) => {
    const novosCampos = [...fields]
    novosCampos[index].atividades.push({ atividade: '', nota: '', peso: '' })
    setFields(novosCampos)
  }

  // Função para adicionar um novo aluno
  const handleAddField = () => {
    setFields([
      ...fields,
      { nome: '', ra: '', atividades: [{ atividade: '', nota: '', peso: '' }], media: 0 },
    ])
  }

  // Função para gerar e baixar a planilha Excel
  const gerarExcel = () => {
    const cabecalho = ['Nome do Aluno', 'RA', 'Atividades e Pesos', 'Média']

    const dados = fields.map((field) => {
      const atividadesString = field.atividades
        .map(
          (atividade) =>
            `${atividade.atividade} (Peso: ${atividade.peso}, Nota: ${atividade.nota})`
        )
        .join('; ')

      const dadosAluno = [
        field.nome,
        field.ra,
        atividadesString,
        field.media.toFixed(2),
      ]
      return dadosAluno
    })

    // Criar a planilha
    const worksheet = XLSX.utils.aoa_to_sheet([cabecalho, ...dados])

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Controle de Notas')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const nomeArquivo = 'controle_de_notas.xlsx'

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = nomeArquivo
    link.click()
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold text-center text-blue-800 mb-4">Modelo de Planilha - Controle de Notas</h1>

        <div className="space-y-4 mb-6">
          <div className="text-lg font-medium text-black">Preencha os dados dos alunos:</div>

          {/* Campos para preencher nome, RA e atividades */}
          {fields.map((field, index) => (
            <div key={index} className="space-y-4">
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  placeholder="Nome do Aluno"
                  value={field.nome}
                  onChange={(e) => handleFieldChange(index, 'nome', e.target.value)}
                  className="p-2 border rounded w-full text-black"
                />
                <input
                  type="text"
                  placeholder="RA"
                  value={field.ra}
                  onChange={(e) => handleFieldChange(index, 'ra', e.target.value)}
                  className="p-2 border rounded w-full text-black"
                />
              </div>

              {/* Campos para atividades, notas e pesos */}
              {field.atividades.map((atividade, atividadeIndex) => (
                <div key={atividadeIndex} className="flex gap-4 items-center">
                  <input
                    type="text"
                    placeholder="Atividade"
                    value={atividade.atividade}
                    onChange={(e) =>
                      handleFieldChange(index, 'atividade', e.target.value, atividadeIndex)
                    }
                    className="p-2 border rounded w-full text-black"
                  />
                  <input
                    type="number"
                    placeholder="Nota"
                    value={atividade.nota}
                    onChange={(e) =>
                      handleFieldChange(index, 'nota', e.target.value, atividadeIndex)
                    }
                    className="p-2 border rounded w-full text-black"
                  />
                  <input
                    type="number"
                    placeholder="Peso"
                    value={atividade.peso}
                    onChange={(e) =>
                      handleFieldChange(index, 'peso', e.target.value, atividadeIndex)
                    }
                    className="p-2 border rounded w-full text-black"
                  />
                </div>
              ))}

              <button
                onClick={() => handleAddActivity(index)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Adicionar Atividade
              </button>
            </div>
          ))}

          <button
            onClick={handleAddField}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Adicionar Aluno
          </button>
        </div>

        <div className="text-lg font-medium mb-4">Média Final:</div>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={index} className="flex justify-between">
              <span>{field.nome}</span>
              <span>{field.media.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <button
          onClick={gerarExcel}
          className="bg-green-500 text-white p-2 rounded w-full mt-4"
        >
          Gerar Planilha
        </button>
      </div>
    </div>
  )
}
