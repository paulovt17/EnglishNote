

Comentários
1


Adicione um comentário…


Fixado por @bryanconatos
@bryanconatos
há 4 meses (editado)
Copie e cole o código abaixo caso vc queira que o cârometro use a proporção de foros 3:4.
Se você precisa da proproção 1:1, basta trocar os valores de "imgW" e "imgH" para 150 no códido.

---------------------------------------
Option Explicit

'===================================================================
' Função que remove acentos de uma string
'===================================================================
Function RemoveAccents(strInput As String) As String
    Dim accents As String
    Dim repls   As String
    Dim i       As Long

    accents = "ÁÀÂÃÄÅáàâãäåÉÈÊËéèêëÍÌÎÏíìîïÓÒÔÕÖØóòôõöøÚÙÛÜúùûüÇçÑñ"
    repls   = "AAAAAAaaaaaaEEEEeeeeIIIIiiiiOOOOOOooooooUUUUuuuuCcNn"

    For i = 1 To Len(accents)
        strInput = Replace(strInput, Mid(accents, i, 1), Mid(repls, i, 1))
    Next i

    RemoveAccents = strInput
End Function


'===================================================================
' Sub principal para gerar o carômetro 3x3 interativo ordenado
'===================================================================
Sub GerarCarometro_3x3_Interativo()
    
    Dim dlg         As FileDialog
    Dim folderPath  As String
    Dim schoolName  As String
    Dim className   As String
    
    Dim fso         As Object
    Dim filesColl   As Collection
    Dim fileArray() As Object
    Dim sortKey()   As String
    Dim file        As Object
    Dim f           As Object
    Dim tmpFile     As Object
    
    Dim pptSlide    As Slide
    Dim pic         As Shape
    
    Dim col         As Long
    Dim row         As Long
    Dim count       As Long
    Dim cnt         As Long
    
    Dim SlideW      As Single
    Dim SlideH      As Single
    Dim imgW        As Single
    Dim imgH        As Single
    Dim headerTop   As Single
    Dim headerH     As Single
    Dim legendH     As Single
    Dim headerTotal As Single
    Dim marginX     As Single
    Dim marginY     As Single
    Dim xPos        As Single
    Dim yPosImg     As Single
    Dim yPosLeg     As Single
    Dim titleH      As Single
    Dim titleTop    As Single
    Dim subtitleTop As Single
    
    Dim tmpKey      As String
    Dim ext         As String    ' <-- declare ext para lidar com .jpeg
    Dim baseName    As String    ' <-- declare baseName para legenda
    Dim i           As Long, j As Long
    
    Const cols As Long = 3
    Const rows As Long = 3
    
    ' Aviso inicial
    MsgBox "Selecione a pasta que contém as fotos dos alunos.", vbInformation, "Instrução"
    
    ' Seletor de pasta
    Set dlg = Application.FileDialog(msoFileDialogFolderPicker)
    With dlg
        .Title = "Selecione a pasta com as fotos"
        .AllowMultiSelect = False
        If .Show <> -1 Then Exit Sub
        folderPath = .SelectedItems(1)
    End With
    
    ' InputBox para escola e turma
    schoolName = InputBox("Digite o nome da escola:", "Nome da Escola")
    className  = InputBox("Digite o nome da turma:",   "Nome da Turma")
    
    ' Configura A4 retrato e captura dimensões
    With ActivePresentation.PageSetup
        .SlideSize   = ppSlideSizeCustom
        .SlideWidth  = 595.28    ' 21 cm
        .SlideHeight = 841.89    ' 29.7 cm
        SlideW = .SlideWidth
        SlideH = .SlideHeight
    End With
    
    ' Definições de layout
    imgW        = 180
    imgH        = 135
    headerTop   = 10           ' margem superior
    headerH     = 50           ' altura do nome da escola
    legendH     = 25           ' altura da legenda e da turma
    headerTotal = headerTop + headerH + 3 + legendH
    
    marginX = (SlideW - cols * imgW) / (cols + 1)
    marginY = (SlideH - headerTotal - rows * imgH - rows * legendH) / (rows + 1)
    
    Set fso = CreateObject("Scripting.FileSystemObject")
    
    '===================================================================
    ' Coleta e ordena arquivos de imagem (agora inclui .jpeg)
    '===================================================================
    Set filesColl = New Collection
    For Each f In fso.GetFolder(folderPath).Files
        If LCase(Right(f.Name, 4)) = ".jpg" _
        Or LCase(Right(f.Name, 4)) = ".png" _
        Or LCase(Right(f.Name, 5)) = ".jpeg" Then    ' <-- adicionado .jpeg
            filesColl.Add f
        End If
    Next f
    
    cnt = filesColl.Count
    If cnt = 0 Then
        MsgBox "Não há arquivos .jpg, .jpeg ou .png na pasta selecionada.", vbExclamation
        Exit Sub
    End If
    
    ReDim fileArray(1 To cnt)
    ReDim sortKey(1 To cnt)
    
    ' Preenche arrays paralelos: objeto + chave sem acentos (ajusta comprimento da extensão)
    For i = 1 To cnt
        Set fileArray(i) = filesColl(i)
        
        ext = LCase(Right(filesColl(i).Name, 4))
        If ext = ".jpg" Or ext = ".png" Then
            baseName = Left(filesColl(i).Name, Len(filesColl(i).Name) - 4)
        Else
            ' cobre o caso ".jpeg" (5 caracteres)
            baseName = Left(filesColl(i).Name, Len(filesColl(i).Name) - 5)
        End If
        
        sortKey(i) = RemoveAccents(baseName)
    Next i
    
    ' Bubble sort (pode trocar por QuickSort se tiver muitos arquivos)
    For i = 1 To cnt - 1
        For j = i + 1 To cnt
            If StrComp(sortKey(i), sortKey(j), vbTextCompare) > 0 Then
                ' troca objetos
                Set tmpFile = fileArray(i)
                Set fileArray(i) = fileArray(j)
                Set fileArray(j) = tmpFile
                ' troca chaves
                tmpKey = sortKey(i)
                sortKey(i) = sortKey(j)
                sortKey(j) = tmpKey
            End If
        Next j
    Next i
    
    '===================================================================
    ' Geração da CAPA
    '===================================================================
    Set pptSlide = ActivePresentation.Slides.Add(1, ppLayoutBlank)
    
    ' Cabeçalho (escola)
    With pptSlide.Shapes.AddTextbox(msoTextOrientationHorizontal, 0, headerTop, SlideW, headerH).TextFrame.TextRange
        .Text = schoolName
        .ParagraphFormat.Alignment = ppAlignCenter
        .Font.Name = "Calibri": .Font.Size = 16: .Font.Bold = msoTrue
    End With
    
    ' Título “CARÔMETRO” centralizado
    titleH   = 100
    titleTop = (SlideH - titleH) / 2
    With pptSlide.Shapes.AddTextbox(msoTextOrientationHorizontal, 0, titleTop, SlideW, titleH).TextFrame.TextRange
        .Text = "CARÔMETRO"
        .ParagraphFormat.Alignment = ppAlignCenter
        .Font.Name = "Calibri": .Font.Size = 48: .Font.Bold = msoTrue
    End With
    
    ' Subtítulo (turma)
    subtitleTop = titleTop + titleH + 10
    With pptSlide.Shapes.AddTextbox(msoTextOrientationHorizontal, 0, subtitleTop, SlideW, legendH).TextFrame.TextRange
        .Text = className
        .ParagraphFormat.Alignment = ppAlignCenter
        .Font.Name = "Calibri": .Font.Size = 24: .Font.Bold = msoFalse
    End With
    
    '===================================================================
    ' Geração dos SLIDES DE FOTOS, usando o array já ordenado
    '===================================================================
    count = 0
    For i = 1 To cnt
        Set file = fileArray(i)
        
        ' novo slide a cada 9 fotos
        If count = 0 Or count Mod (cols * rows) = 0 Then
            Set pptSlide = ActivePresentation.Slides.Add( _
                ActivePresentation.Slides.Count + 1, ppLayoutBlank)
            col = 0: row = 0
            
            ' cabeçalho (escola)
            With pptSlide.Shapes.AddTextbox(msoTextOrientationHorizontal, 0, headerTop, SlideW, headerH).TextFrame.TextRange
                .Text = schoolName
                .ParagraphFormat.Alignment = ppAlignCenter
                .Font.Name = "Calibri": .Font.Size = 16: .Font.Bold = msoTrue
            End With
            
            ' turma 3pt abaixo, em negrito
            With pptSlide.Shapes.AddTextbox(msoTextOrientationHorizontal, 0, headerTop + headerH + 3, SlideW, legendH).TextFrame.TextRange
                .Text = className
                .ParagraphFormat.Alignment = ppAlignCenter
                .Font.Name = "Calibri": .Font.Size = 14: .Font.Bold = msoTrue
            End With
        End If
        
        ' calcula posição
        xPos    = marginX + col * (imgW + marginX)
        yPosImg = headerTotal + marginY + row * (imgH + legendH + marginY)
        yPosLeg = yPosImg + imgH
        
        ' insere foto
        Set pic = pptSlide.Shapes.AddPicture(file.Path, msoFalse, msoTrue, xPos, yPosImg, imgW, imgH)
        pic.Line.Visible = msoTrue: pic.Line.Weight = 1: pic.Line.ForeColor.RGB = RGB(0, 0, 0)
        
        ' legenda (nome do arquivo sem extensão, agora cobrindo .jpeg)
        ext = LCase(Right(file.Name, 4))
        If ext = ".jpg" Or ext = ".png" Then
            baseName = Left(file.Name, Len(file.Name) - 4)
        Else
            baseName = Left(file.Name, Len(file.Name) - 5)
        End If
        
        With pptSlide.Shapes.AddTextbox(msoTextOrientationHorizontal, xPos, yPosLeg, imgW, legendH).TextFrame.TextRange
            .Text = baseName
            .ParagraphFormat.Alignment = ppAlignCenter
            .Font.Name = "Calibri": .Font.Size = 12: .Font.Bold = msoFalse
        End With
        
        col = col + 1
        If col = cols Then col = 0: row = row + 1
        count = count + 1
    Next i
    
    MsgBox "Carômetro interativo gerado com sucesso!", vbInformation

End Sub


