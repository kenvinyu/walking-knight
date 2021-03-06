import React from 'react';
import './InteractiveBoard.css';
import { Paper, Card, CardContent, Typography, Button, Tooltip } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import BoardDisplay from '../BoardDisplay';
import PieceButton from '../PieceButton';
import { Board, BoardPiece } from '../../Board';

interface IInteractiveBoardProps {
    selected_default: BoardPiece,
    board_default: Board,
    on_calculate: (board: Board) => (() => void)
}

interface IInteractiveBoardState {
    selected: BoardPiece,
    board: Board
}

export default class InteractiveBoard extends React.Component<IInteractiveBoardProps, IInteractiveBoardState> {
    constructor(props: IInteractiveBoardProps) {
        super(props);
        this.state = {
            selected: props.selected_default,
            board: props.board_default
        };

        this.handle_click = this.handle_click.bind(this);
    }

    handle_click(row: number, col: number): () => void {
        return () => {
            const new_board: Board = this.state.board.clone();

            // Uniqueness check
            switch (this.state.selected) {
                case BoardPiece.BlackKnight:
                case BoardPiece.Dest:
                    new_board.find_all_and_delete(this.state.selected);
                    break;
            }

            new_board.squares[row][col] = this.state.selected;
            this.setState({ board: new_board });
        }
    }

    render(): JSX.Element {
        const board: Board = this.state.board;
        const disable_button: boolean = !board.exists_start_and_dest();

        return (
            <div className='flex_vcenter int_board_container'>
                <div className='inline_flex_hcenter'>
                    <div className='board_container'>
                        <Paper elevation={4} square>
                            <div className='board_container'>
                                <BoardDisplay board={board} on_click={this.handle_click} />
                            </div>
                        </Paper>
                    </div>

                    <Card className='piece_card_container'>
                        <CardContent>
                            <div className='piece_card_content_container'>
                                <div className='piece_category_container'>
                                    <div className='text_icon_container'>
                                        <Typography variant='h5' color='textSecondary'>
                                            Start
                                        </Typography>
                                    </div>
                                    <div className='piece_buttons_container'>
                                        <PieceButton
                                            selected={this.state.selected}
                                            piece={BoardPiece.BlackKnight}
                                            on_change={() => {
                                                this.setState({ selected: BoardPiece.BlackKnight })
                                            }}
                                            tooltip='Start'
                                        />
                                    </div>
                                </div>

                                <div className='divider' />

                                <div className='piece_category_container'>
                                    <div className='text_icon_container'>
                                        <Typography variant='h5' color='textSecondary'>
                                            Finish
                                        </Typography>
                                        <Tooltip
                                            title='Only for marking destination. Does not attack.'
                                            arrow
                                        >
                                            <InfoIcon className='icon' style={{ fontSize: 16 }} />
                                        </Tooltip>
                                    </div>
                                    <div className='piece_buttons_container'>
                                        <PieceButton
                                            selected={this.state.selected}
                                            piece={BoardPiece.Dest}
                                            on_change={() => {
                                                this.setState({ selected: BoardPiece.Dest })
                                            }}
                                            tooltip='Finish'
                                        />
                                    </div>
                                </div>

                                <div className='divider' />

                                <div className='piece_category_container'>
                                    <div className='text_icon_container'>
                                        <Typography variant='h5' color='textSecondary'>
                                            Obstacles
                                        </Typography>
                                        <Tooltip
                                            title='Obstacles have the same attack patterns as their equivalent chess piece.
                                                The Black Knight cannot move into a square under attack.
                                                Obstacles do not move.'
                                            arrow
                                        >
                                            <InfoIcon className='icon' style={{ fontSize: 16 }} />
                                        </Tooltip>
                                    </div>
                                    <div className='piece_buttons_container'>
                                        <PieceButton
                                            selected={this.state.selected}
                                            piece={BoardPiece.WhiteKnight}
                                            on_change={() => {
                                                this.setState({ selected: BoardPiece.WhiteKnight })
                                            }}
                                            tooltip='Knight Obstacle'
                                        />
                                        <PieceButton
                                            selected={this.state.selected}
                                            piece={BoardPiece.WhiteBishop}
                                            on_change={() => {
                                                this.setState({ selected: BoardPiece.WhiteBishop })
                                            }}
                                            tooltip='Bishop Obstacle'
                                        />
                                        <PieceButton
                                            selected={this.state.selected}
                                            piece={BoardPiece.WhiteRook}
                                            on_change={() => {
                                                this.setState({ selected: BoardPiece.WhiteRook })
                                            }}
                                            tooltip='Knight Obstacle'
                                        />
                                        <PieceButton
                                            selected={this.state.selected}
                                            piece={BoardPiece.WhiteQueen}
                                            on_change={() => {
                                                this.setState({ selected: BoardPiece.WhiteQueen })
                                            }}
                                            tooltip='Queen Obstacle'
                                        />
                                    </div>
                                </div>

                                <div className='divider' />

                                <div className='piece_category_container'>
                                    <div className='text_icon_container'>
                                        <Typography variant='h5' color='textSecondary'>
                                            Delete
                                        </Typography>
                                    </div>
                                    <div className='piece_buttons_container'>
                                        <PieceButton
                                            selected={this.state.selected}
                                            piece={BoardPiece.None}
                                            on_change={() => {
                                                this.setState({ selected: BoardPiece.None })
                                            }}
                                            tooltip='Delete'
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className='inline_flex_hcenter calculate_button_container'>
                    <Tooltip
                        title={disable_button ? 'Place Start and Finish' : ''}
                        arrow
                    >
                        <span>
                            <Button
                                variant='contained'
                                color='primary'
                                disabled={disable_button}
                                onClick={this.props.on_calculate(board)}
                            >
                                Calculate Shortest Paths
                            </Button>
                        </span>
                    </Tooltip>
                </div>
            </div>
        );
    }
}