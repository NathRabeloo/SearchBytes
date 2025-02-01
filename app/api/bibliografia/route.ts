// app/api/bibliografia/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Defina o diretório onde os arquivos serão armazenados
const uploadDirectory = path.join(process.cwd(), 'uploads')

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('bibliografia') as File

    // Verifica se o arquivo foi selecionado
    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
    }

    // Define o caminho do arquivo
    const filePath = path.join(uploadDirectory, file.name)

    // Cria o diretório de uploads, se necessário
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory)
    }

    // Salva o arquivo no diretório
    const buffer = Buffer.from(await file.arrayBuffer())
    fs.writeFileSync(filePath, buffer)

    return NextResponse.json({ fileName: file.name })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erro ao salvar o arquivo' }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Lista os arquivos na pasta de uploads
    const files = fs.readdirSync(uploadDirectory)
    return NextResponse.json(files)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Erro ao listar os arquivos' }, { status: 500 })
  }
}
